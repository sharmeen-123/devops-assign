import e from "express";
import payments from "../models/payment.model";
import shifts from "../models/shifts.model";
import cycles from "../models/cycle.model";
import axios from 'axios';

const cron = require("node-cron");
// const shell = require('shelljs');
// import fetch from 'node-fetch';


const jwt = require("jsonwebtoken");

//VALIDATION
const Joi = require("@hapi/joi");
let paymenttid = false;

// validate body of start payment
const addpaymentValidationSchema = Joi.object({
  userName: Joi.string().required(),
  userEmail: Joi.string().required(),
  userImage: Joi.string(),
  totalHours: Joi.number().required(),
  wage: Joi.number().required(),
  paidAmount: Joi.number().required(),
  shifts: Joi.number().required(),
  userID: Joi.string().required(),

});
// validate body of start payment
const updatepaymentValidationSchema = Joi.object({
  userName: Joi.string().required(),
  userEmail: Joi.string().required(),
  userImage: Joi.string(),
  totalHours: Joi.number().required(),
  wage: Joi.number().required(),
  paidAmount: Joi.number().required(),
  shifts: Joi.number().required(),
  userID: Joi.string().required(),

});


const paymentsController = {
  // ----------------- api to start payment ----------------- 
  async addpayment(req, res) {
    // checking for validation
    const { error } = addpaymentValidationSchema.validate(req.body);

    if (error) {
      console.log(error.details[0].message);
      res.status(400).send(error.details[0].message);
    } else {
      let paymentData = req.body;
      const today = new Date()
      let payment = new payments(paymentData);
      payment.paymentDate = today
      //test.start()

      payment.save((error, newpayment) => {
        if (error) {
          res.send(error.message);
        } else {
          paymenttid = newpayment._id;

          // sending response
          res.status(200).send({
            userID: newpayment.userID,
            // checkinLocation: newpayment.checkinLocation,
            // checkinTime: newpayment.checkinTime,
            // locations: newpayment.locations,
            // lastLocation: newpayment.lastLocation,
            // status: newpayment.status,
            // totalHours: newpayment.totalHours,
            _id: newpayment._id,
          });
        }
      });
    }
  },

   // ----------------- api to change location ----------------- 
   async setPaid(req, res) {
    
      let id = req.params.id;
 
        // update location if changed
        const updateResult = await shifts.updateMany(
          { userID: id },
          { $set: { isPaid: true } }
        );
      res.status(200).send({
        data: "Location changed successfully",
      });
  },

  // ----------------- api to update user ----------------- 
  async updatePayment(req, res) {
    // checking for validation
    const { error } = updatepaymentValidationSchema.validate(req.body);
    if (error) {
      console.log(error.details[0].message);
      res.status(400).send(error.details[0].message);
    } else {
      let id = req.params.id;
      let updatedPayment = req.body;


      // update user
      const update = await payments.findOneAndUpdate(
        { _id: id },
        {
          userName: updatedPayment.userName,
          userEmail: updatedPayment.userEmail,
          userImage: updatedPayment.userImage,
          totalHours: updatedPayment.totalHours,
          wage: updatedPayment.wage,
          paidAmount: updatedPayment.paidAmount,
          shifts: updatedPayment.shifts,
          userID: updatedPayment.userID,

        }
      )
      if (!update) {
        console.log("error")
        res.status(400).send("Error");
      }

      else {
        res.status(200).send({
          data: "data updated successfully",
        });
      }

    }
  },

  // ----------------- api to get all payments ----------------- 
  async getAllPayments(req, res) {
    let payment = req.query;
    let data = await payments.find({
      startedBy: payment.startedBy,
    });
    res.status(200).send({
      data: data.reverse(),
    });
  },

  // ----------------- api to get total amount paid ----------------- 
  async getAmountPaid(req, res) {
    let payment = req.query;
    const now = new Date()
    const dayOfMonth = now.getDate();
    let cycleDay;

    // checking in which cycle we are

    if (dayOfMonth >= 15 && dayOfMonth < 30) {
      cycleDay = dayOfMonth - 14;
    } else if (dayOfMonth >= 30 || dayOfMonth < 15) {
      cycleDay = dayOfMonth + 1;
    }
    console.log("cycleday.......", cycleDay);
    const thisCyclePayment = new Date(now.getTime() - (cycleDay * 24 * 60 * 60 * 1000)); // Subtract 120 days from the current date

    let thisCycle = await payments.find({
      paymentDate: { $gte: thisCyclePayment },
    });
    let allCycle = await payments.find({

    });
    let currentCyclePayment = 0;
    let allCyclePayment = 0;
    for (let i = 0; i < thisCycle.length; i++) {
      currentCyclePayment += thisCycle[i].paidAmount;
    }
    for (let i = 0; i < allCycle.length; i++) {
      allCyclePayment += allCycle[i].paidAmount;
    }

    res.status(200).send({
      thisCyclePayment: currentCyclePayment,
      totalAmountPaid: allCyclePayment,
    });
  },
  // ----------------- api to get 8 cycles payments ----------------- 
  async getAllcycles(req, res) {
    const now = new Date();
    const dayOfMonth = now.getDate();
    let cycleDay;

    // checking in which cycle we are

    if (dayOfMonth >= 15 && dayOfMonth < 30) {
      cycleDay = dayOfMonth - 14;
    } else if (dayOfMonth >= 30 || dayOfMonth < 15) {
      cycleDay = dayOfMonth + 1;
    }
    console.log("cycleday.......", cycleDay);
    const prevCycle = new Date(now.getTime() - ((120+cycleDay) * 24 * 60 * 60 * 1000)); // Subtract 120 days from the current date
    const thisCycle = new Date(now.getTime() - (cycleDay * 24 * 60 * 60 * 1000)); // Subtracting day of cycle

    let shifts = await payments.find({ paymentDate: { $gte: prevCycle, $lt: thisCycle } });
    shifts.sort((a, b) => a.paymentDate - b.paymentDate); // sorting above array by date
    // dividing sorted shifts into cycle
    const shiftsByDate = {};
    for (const shift of shifts) {
      const date = shift.paymentDate.toDateString();
      if (!shiftsByDate[date]) {
        shiftsByDate[date] = [];
      }
      shiftsByDate[date].push(shift);
      console.log(shift)
    }

    // grouping shifts
    const cycles = [];
    const cycleLength = 15 * 24 * 60 * 60 * 1000; // 15 days in milliseconds
    const earliestShiftTimestamp = new Date(Object.keys(shiftsByDate)[0]).getTime();
    let cycleStart = earliestShiftTimestamp;
    let cycleEnd = cycleStart + (cycleLength - 1);
    let cycleShifts = 0;

    for (const date of Object.keys(shiftsByDate)) {
      const dateMs = new Date(date).getTime();
      if (dateMs >= cycleStart && dateMs <= cycleEnd) {
        console.log("shift by date...", shiftsByDate[date])
        for(let i =0;i<shiftsByDate[date].length;i++){
          cycleShifts += shiftsByDate[date][i].paidAmount;
        }
        
      } else {
        // cycles.push({ start: new Date(cycleStart), end: new Date(cycleEnd), shifts: cycleShifts });
        cycles.push(cycleShifts);
        cycleStart = cycleEnd + 1;
        cycleEnd = cycleStart + (cycleLength - 1);
        for(let i =0;i<shiftsByDate[date].length;i++){
          cycleShifts += shiftsByDate[date][i].paidAmount;
        }
      }
    }

    // add last cycle
    // cycles.push({ start: new Date(cycleStart), end: new Date(cycleEnd), shifts: cycleShifts });
    cycles.push(cycleShifts);

    res.status(200).send({
      data: cycles,
    });
  },

  // ----------------- api to get payment by matching name ----------------- 
  async getPaymentByName(req, res) {
    let body = req.params.name;
    let data = await payments.find({
    })
    const checkName = (data) => {
      let namee = data.userName;
      if (namee.toUpperCase().includes(body.toUpperCase())) {
        return true;
      }
      else {
        return false;
      }
    }

    let filterData = data.filter(checkName);

    res.status(200).send({
      data: filterData.reverse(),
    });
  },

  // ----------------- api to delete payment ----------------- 
  async deletePayment(req, res) {
    let paymentId = req.params.id;
    await payments.deleteOne(
      {
        _id: paymentId,
      },
      (err, suc) => {
        if (err) {
          res.status(404).send("user not found");
        } else {
          if (suc.deletedCount == 1) {
            res.send("deleted");
          } else res.status(404).send("user not found");
        }
      }
    );
  },


};




export default paymentsController;

import e from "express";
import shifts from "../models/shifts.model";
import cycles from "../models/cycle.model";
import axios from 'axios';
import { get } from "mongoose";
const moment = require('moment');


const cron = require("node-cron");
// const shell = require('shelljs');
// import fetch from 'node-fetch';


const jwt = require("jsonwebtoken");

//VALIDATION
const Joi = require("@hapi/joi");
let shifttid = false;

// validate body of start shift
const startShiftValidationSchema = Joi.object({
  checkinLocation: Joi.object().required(),
  checkinTime: Joi.date().required(),
  userID: Joi.string().required(),
});
// validate body of end shift
const endShiftValidationSchema = Joi.object({
  checkoutLocation: Joi.object().min(3).required(),
});
// validate body of change location
const changeLocationValidationSchema = Joi.object({
  lastLocation: Joi.object().min(2).required(),
});

// .................... to update location .........................
const updateData = async () => {
  // console.log("in update.......")
  try {
    const response = await axios.get('http://api.ipapi.com/api/check?access_key=9c326d6e83bb32f28397c00bc5025384');
    let location = response.data;
    console.log(`Location: ${location}`);
    let updatedLocation = {
      longitude: location.longitude,
      latitude: location.latitude
    }
    let updateLocation = await shifts.findOneAndUpdate(
      { _id: shifttid },
      {
        lastLocation: updatedLocation,
        $push: {
          locations: updatedLocation
        }
      }
    )

  } catch (error) {
    console.log(error.message);
  }
};


let test = cron.schedule('*/15 * * * *', () => {
  // console.log("cron running.......")
  if (shifttid) {
    updateData();
    console.log("data updated!!!", shifttid)
  }
});

// store shift to cycle after 15 days
const cycle = async (data) => {

  // Function call
  cycles.insertMany(data).then(function () {
    console.log("Data inserted")  // Success
    deleteShifts(data)
  }).catch(function (error) {
    console.log(error)      // Failure
  });

}

const deleteShifts = async (data) => {
  // Function call
  shifts.remove().then(function () {
    console.log("shifts removed")  // Success
  }).catch(function (error) {
    console.log(error)      // Failure
  });

}


// get all shifts
const shiftAll = async () => {
  let data = await shifts.find({
  });
  // console.log(data)
  if (data) {

    cycle(data)
  }
}

// crone 2
cron.schedule('0 0 */15 * *', () => {
  console.log("cron running on cycle compeletion")
  shiftAll()

  console.log("data updated!!!")

}).start();

const shiftsController = {
  // ----------------- api to start shift ----------------- 
  async startShift(req, res) {
    // checking for validation
    const { error } = startShiftValidationSchema.validate(req.body);
    // getting current date time
    var date_time = new Date();
    if (error) {
      console.log(error.details[0].message);
      res.status(400).send(error.details[0].message);
    } else {
      let shiftData = req.body;
      shiftData.locations = [shiftData.checkinLocation];
      shiftData.status = "active";
      shiftData.lastLocation = shiftData.checkinLocation;
      shiftData.totalHours = "00:00:00";
      shiftData.isPaid = false;
      // creating array of locations
      let locations = [shiftData.checkinLocation];
      console.log(locations);
      let shift = new shifts(shiftData);
      //test.start()

      shift.save((error, newShift) => {
        if (error) {
          res.send(error.message);
        } else {
          shifttid = newShift._id;


          // sending response
          res.status(200).send({
            userID: newShift.userID,
            _id: newShift._id,
          });
        }
      });
    }
  },

  // ----------------- api to change location ----------------- 
  async changeLocation(req, res) {
    // checking for validation
    const { error } = changeLocationValidationSchema.validate(req.body);
    console.log("in update location")
    if (error) {
      console.log(error.details[0].message);
      res.status(400).send(error.details[0].message);
    } else {
      let id = req.params.id;
      let location = req.body;
      console.log("location in updated", location.lastLocation)
      let data = await shifts.find({
        _id: id,
      });
      let updateLocation = false;
      let ifUpdate = true;
      let lastLocation = data[0].lastLocation;
      let currentLocation = location.lastLocation;
      if (lastLocation.speed === currentLocation.speed || lastLocation.heading === currentLocation.heading ||
        lastLocation.altitude === currentLocation.altitude || lastLocation.accuracy === currentLocation.accuracy ||
        lastLocation.longitude === currentLocation.longitude || lastLocation.latitude === currentLocation.latitude) {
        ifUpdate = false;
      }

      console.log("data", ifUpdate)
      if (ifUpdate) {
        // update location if changed
        updateLocation = await shifts.findOneAndUpdate(
          { _id: id },
          {
            lastLocation: location.lastLocation,
            $push: {
              locations: location.lastLocation
            }
          }
        )
      }




      res.status(200).send({
        data: "Location changed successfully",
      });


    }
  },

  // ----------------- api to end shift ----------------- 
  async endShift(req, res) {
    // checking for validation

    const { error } = endShiftValidationSchema.validate(req.body);
    //test.end()
    if (error) {
      console.log(error.details[0].message);
      res.status(400).send(error.details[0].message);
    } else {
      shifttid = false;
      let id = req.params.id;
      let endShift = req.body;

      let data = await shifts.find({
        _id: id,
      });
      console.log("data is  ", data)


      const currentTime = new Date();
      const givenTime = data[0].checkinTime

      // Calculate the difference in milliseconds
      const timeDiff = currentTime.getTime() - new Date(givenTime).getTime();

      // Convert the difference to hours, minutes, and seconds
      let hours = Math.floor(timeDiff / (1000 * 60 * 60)).toString();
      let minutes = Math.floor((timeDiff / (1000 * 60)) % 60).toString();
      let seconds = Math.floor((timeDiff / 1000) % 60).toString();
      if (hours.toString().length === 1) {

        hours = '0' + hours.toString()
      }
      if (minutes.toString().length === 1) {

        minutes = '0' + minutes.toString()
      }
      if (seconds.toString().length === 1) {

        seconds = '0' + seconds.toString()
      }

      const totalHours = hours + " : " + minutes + " : " + seconds




      // update location
      const updateLocation = await shifts.findOneAndUpdate(
        { _id: id },
        {
          lastLocation: endShift.checkoutLocation,
          checkoutLocation: endShift.checkoutLocation,
          checkoutTime: currentTime,
          totalHours: totalHours,
          status: "Compeleted",
          $push: {
            locations: endShift.checkoutLocation,
          }
        }
      )
      if (!updateLocation) {
        res.status(400).send("User not Exists");
      }
      else {
        res.status(200).send({
          data: "Shift Ended Successfully",
        });
      }

    }
  },

  // ----------------- api to get all shifts ----------------- 
  async getAllShifts(req, res) {
    let shift = req.query;
    let data = await shifts.find({
      startedBy: shift.startedBy,
    });
    res.status(200).send({
      data: data,
    });
  },

  // ----------------- api to get all shifts ----------------- 
  async getActiveShifts(req, res) {
    let shift = req.query;
    let data = await shifts.find({
      startedBy: shift.startedBy,
      status: "active"
    });
    res.status(200).send({
      data: data,
    });
  },

  // ----------------- api to get all shifts of particular user ----------------- 
  async getShiftsOfOneUser(req, res) {
    let userID = req.params.userID;
    let shiftt = await shifts.find({
      userID: userID,
      status: "Compeleted",
    });
    let data = []
    // let obj = {}
    let shift = shiftt.map((val, ind) => {
      let checkin = getTime(val.checkinTime)
      let checkout = getTime(val.checkoutTime)

      const checkinDate = checkin.date
      const checkinTime = checkin.time
      const checkoutDate = checkout.date
      const checkoutTime = checkout.time
      let obj = {
        totalHours: val.totalHours,
        checkinTime: checkinTime,
        checkinDate: checkinDate,
        checkoutTime: checkoutTime,
        checkoutDate: checkoutDate,
        status: val.status
      }
      data.push(obj)
    })
    if (shift.length !== 0) {
      res.status(200).send({
        data: data.reverse(),
      })
    } else {
      res.status(400).send({
        data: "user not found!",
      });
    }

  },

  // ----------------- api to get recent 2 shifts of particular user ----------------- 
  async getRecentShiftsOfOneUser(req, res) {
    let userID = req.params.userID;
    let shiftt = await shifts.find({
      userID: userID,
      status: "Compeleted",
    }).sort({ checkinTime: -1 }).limit(2);
    let data = []
    // let obj = {}
    let shift = shiftt.map((val, ind) => {
      let checkin = getTime(val.checkinTime)
      let checkout = getTime(val.checkoutTime)

      const checkinDate = checkin.date
      const checkinTime = checkin.time
      const checkoutDate = checkout.date
      const checkoutTime = checkout.time
      let obj = {
        totalHours: val.totalHours,
        checkinTime: checkinTime,
        checkinDate: checkinDate,
        checkoutTime: checkoutTime,
        checkoutDate: checkoutDate,
        status: val.status
      }
      data.push(obj)
    })
    if (shift.length !== 0) {
      res.status(200).send({
        data: data,
      })
    } else {
      res.status(400).send({
        data: "user not found!",
      });
    }

  },

  // ----------------- api to get recent 2 shifts of particular user ----------------- 
  async getShiftsAndHoursOfOneUser(req, res) {
    let userID = req.params.userID;
    let shiftt = await shifts.find({
      userID: userID,
      status: "Compeleted",
    });
    const time1 = '00:00:00';
    let date1 = new Date('1970-01-01T' + time1 + 'Z');
    let shift = shiftt.map((val, ind) => {
      
      const time2 = val.totalHours;

      // Convert times to Date objects
      const date2 = moment.utc(time2, 'HH:mm:ss').toDate();

  // Convert date2 to a UTC timestamp and add it to date1
  date1 = new Date(date1.getTime() + date2.getTime());

    })

     // Add the two dates
     const result = new Date(date1.getTime() - new Date('1970-01-01T00:00:00Z').getTime());

     // Format the result as hh:mm:ss
     const hours = result.getUTCHours().toString().padStart(2, '0');
     const minutes = result.getUTCMinutes().toString().padStart(2, '0');
     const seconds = result.getUTCSeconds().toString().padStart(2, '0');
     const sum = `${hours}:${minutes}:${seconds}`;

     console.log(date1,"........",sum); // Output: 00:31:20
     let data = {
      totalTime : sum,
      totalShifts: shiftt.length
     } 
    if (shift.length !== 0) {
      res.status(200).send({
        data: data,
      })
    } else {
      res.status(400).send({
        data: "user not found!",
      });
    }

  },

  // ----------------- api to get number of active and completed shifts ----------------- 
  async getNumberOfShifts(req, res) {
    let completedShifts = await shifts.find({
      status: "Compeleted",
    });
    let activeShifts = await shifts.find({
      status: "active",
    });
    let allShifts = await shifts.find({

    });
    let data = {
      activeShifts: activeShifts.length,
      completedShifts: completedShifts.length,
      allShifts: allShifts.length
    }
    res.status(200).send({
      data: data,
    });


  },

  // ----------------- api to get number number of hours ----------------- 
  async getNumberOfHours(req, res) {
    let userID = req.params.userID;
    const completedShifts = await shifts.find({
      status: "Compeleted",
      userID: userID,
      isPaid: false
    });
    let totalHours = 0;
    completedShifts.map((val, ind) => {
      let time = val.totalHours;
      let time2 = time.split(":")
      totalHours += (+time2[0])
      // console.log((+time2[0]), " ", (+time2[1]/60), " ", (+time2[1]/(60*60)))
      totalHours += (+time2[1] / 60)
      totalHours += (+time2[1] / (60 * 60))
    })
    totalHours = Math.round(totalHours);
    let data = {
      totalHours: totalHours,
      shifts: completedShifts.length
    }
    if (completedShifts) {
      res.status(200).send({
        data: data,
      });
    } else {
      res.status(200).send({
        data: 0,
      });
    }



  },
};

const getTime = (time) => {
  let date = time.getDate().toString();
  let month = (time.getMonth() + 1).toString(); // add 1 because month is zero-indexed
  let year = time.getFullYear().toString();
  let hours = time.getHours().toString();
  let minutes = time.getMinutes().toString();
  let seconds = time.getSeconds().toString();

  if (hours.toString().length === 1) {

    hours = '0' + hours.toString()
  }
  if (minutes.toString().length === 1) {

    minutes = '0' + minutes.toString()
  }
  if (seconds.toString().length === 1) {

    seconds = '0' + seconds.toString()
  }
  const Date = date + "-" + month + '-' + year
  const Time = hours + " : " + minutes + " : " + seconds
  let dateTime = {
    date: Date,
    time: Time
  }
  return dateTime
}




export default shiftsController;

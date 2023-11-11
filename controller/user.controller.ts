import User from "../models/user.model";
import shifts from "../models/shifts.model";

const bcrypt = require("bcryptjs");

//VALIDATION
const Joi = require("@hapi/joi");


//validation for update data
const updateValidationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  userType: Joi.string().required(),
  image: Joi.string(),
  address: Joi.string().min(5).required(),
  password: Joi.string(),
});
//validation for update pass data
const updatePasswordValidationSchema = Joi.object({
  oldPassword:Joi.string().required(),
  password: Joi.string().required(),
});

//validation to make user active
const activeUserValidationSchema = Joi.object({
  active: Joi.boolean().required(),
});




const userController = {



  // ----------------- api to update user ----------------- 
  async updateUser(req, res) {
    // checking for validation
    const { error } = updateValidationSchema.validate(req.body);
    if (error) {
      console.log(error.details[0].message);
      res.status(400).send(error.details[0].message);
    } else {
      let id = req.params.id;
      let updatedUser = req.body;
      // console.log("image ==> ",updatedUser.image)
      
      // const url = await uploadImage(updatedUser.image);
      // updatedUser.image = url;
      // console.log("public id ==> ",url, "updated user", updatedUser)
      
      let name = updatedUser.name.split(" ");
      const checkName = (name) => {
        if (name !== ""){
          console.log("return")
          return true
        }
        else {
          return false;
        }
      }
      let namee = name.filter(checkName);
      

        // update user
        let update;
        if(updatedUser.password){
          const salt = await bcrypt.genSalt(10);
            updatedUser.password = await bcrypt.hash(updatedUser.password, salt);
            console.log("password", updatedUser.password);
            console.log("id", id);
          update = await User.findOneAndUpdate(
            {_id : id},
            {
              firstName: namee[0],
              lastName: namee[1],
              password: updatedUser.password,
                email: updatedUser.email,  
                phone: updatedUser.phone,
                image: updatedUser.image,
                address: updatedUser.address,
            }
        )}else{
          update = await User.findOneAndUpdate(
            {_id : id},
            {
              firstName: namee[0],
              lastName: namee[1],
                email: updatedUser.email,  
                phone: updatedUser.phone,
                image: updatedUser.image,
                address: updatedUser.address,
            }
        )
        }
      if (!update){
        console.log("error")
        res.status(400).send("Error");
      }
     
      else{
        res.status(200).send({
          data: "data updated successfully",
        });
      }
     
    }   
  },

   // ----------------- api to update user ----------------- 
   async updatePassword(req, res) {
    // checking for validation
    const { error } = updatePasswordValidationSchema.validate(req.body);
    if (error) {
      console.log(error.details[0].message);
      res.status(400).send(error.details[0].message);
    } else {
      let id = req.params.id;
      let updatedUser = req.body;

      const foundUser = await User.findOne({ 
       _id: id, 
      });
      
     
        const validPass = await bcrypt.compare(
          updatedUser.oldPassword,
          foundUser.password
        );
        if (!validPass) {
          res.status(400).send("Incorrect Password");
        } else {
      
      
      const salt = await bcrypt.genSalt(10);
      updatedUser.password = await bcrypt.hash(updatedUser.password, salt);
      

        // update user
          const update = await User.findOneAndUpdate(
            {_id : id},
            {
              password: updatedUser.password,
            }
        )
      if (!update){
        console.log("error")
        res.status(400).send("Error");
      }
     
      else{
        res.status(200).send({
          data: "Password Updated",
        });
      }
     
    }   
  }
  },

  // ----------------- api to verify user ----------------- 
  async verifyUser(req, res) {
      let id = req.params.id;
      let data = await User.find({
        _id: id,
      });
  
      const status = data[0].verified;
      let update;

      if (status){
        // set verified false
        update = await User.findOneAndUpdate(
          {_id : id},
          {verified: false}
      )
      }else{
        // set verified false
        update = await User.findOneAndUpdate(
          {_id : id},
          {verified: true}
      )
      }
      if (!update){
        res.status(400).send("User not Exists");
      }
      else{
        res.status(200).send({
          data: "data updated successfully",
        });
      }
  },

  // ----------------- api to make user active ----------------- 
  async activeUser(req, res) {
    // checking for validation
    const { error } = activeUserValidationSchema.validate(req.body);
    if (error) {
      console.log(error.details[0].message);
      res.status(400).send(error.details[0].message);
    } else {
      let id = req.params.id;
      let updatedUser = req.body;

        // set active
          const update = await User.findOneAndUpdate(
            {_id : id},
            {active: updatedUser.active,}
        )
      if (!update){
        res.status(400).send("User not Exists");
      }
     
      else{
        res.status(200).send({
          data: "data updated successfully",
        });
      }
     
    }   
  },

  // ----------------- api to block or unblock user ----------------- 
  async switchUserStatus(req, res) {
    let id = req.params.id;
    let data = await User.find({
      _id: id,
    });

    const status = data[0].status;
    let update;

    // if status is blocked
    if(status === "block"){
        update = await User.findOneAndUpdate(
        {_id : id},
        {status: "unblock",}
    )
    }
    // if status is set to unblock
    else {
      update = await User.findOneAndUpdate(
        {_id : id},
        {status: "block",}
    )
    }
      if (!update){
        res.status(400).send("User not Exists");
      }
      else{
        res.status(200).send({
          data: "Status updated",
        });
 }
  },

  // ----------------- api to get all users ----------------- 
  async getAllUsers(req, res) {
    let user = req.query;
    let data = await User.find({
      startedBy: user.startedBy,
    });
    res.status(200).send({
      data: data.reverse(),
    });
  },

    // ----------------- api to get all siteWorkers ----------------- 
    async getAllSiteWorkers(req, res) {
      let user = req.query;
      let data = await User.find({
        userType: 'Site Worker',
      });
      res.status(200).send({
        data: data.reverse(),
      });
    },

 // ----------------- api to find user status (active) ----------------- 
 async getUserStatus(req, res) {
  let user = req.query;
  let users = await User.find({
    startedBy: user.startedBy,
  });
  let shift = await shifts.find({
    status: "active",
  });
  let userWithStatus = []
  let obj;
  let active;
  users.map((val, ind)=>{
    active = false;
    console.log("..............................")
    shift.map((val2, ind2)=>{
      // console.log("val....", val._id," val2.........", val2.userID)
      if(val._id.toString()===val2.userID.toString()){
          active = true;
          if(val.image){
            obj = {
              name: val.firstName+" "+val.lastName,
              image: val.image,
              active: active,
              email: val.email,
              job: val.userType,
              contact: val.phone,
              startTime: val2.checkinTime,
              lastLocation: val2.lastLocation,
              locations: val2.locations,
              checkinLocation: val2.checkinLocation,
              userID: val2.userID,
            }
          }else{
            obj = {
              name: val.firstName+" "+val.lastName,
              image: 'aa',
              active: active,
              email: val.email,
              job: val.userType,
              contact: val.phone,
              startTime: val2.checkinTime,
              currentLocation: val2.lastLocation,
              lastLocation: val2.lastLocation,
              locations: val2.locations,
              checkinLocation: val2.checkinLocation,
              userID: val2.userID,
            }
          }
      }
    })
    
    
    if(active){
      userWithStatus.push(obj)}
    
  })
  // if(userWithStatus.length>0){
  res.status(200).send({
    data: userWithStatus,
  })
// }else{
//     res.status(400).send({
//       data: 'data not exists',
//     })
//   }
},

  // ----------------- api to get particular users by matching id ----------------- 
  async getOneUser(req, res) {
    let id = req.params.id;
    let data = await User.find({
      _id: id,
    });
    res.status(200).send({
      data: data,
    });
  },

   // ----------------- api to get user by matching name ----------------- 
   async getUserByName(req, res) {
    let body = req.params.name;
    let data = await User.find({
    })
    const checkName = (data) => {
      let namee = data.firstName + " " + data.lastName;
      if(namee.toUpperCase().includes(body.toUpperCase())){
        return true;
      }
      else{
        return false;
      }
    }
    
    let filterData = data.filter(checkName);
    
    res.status(200).send({
      data: filterData.reverse(),
    });
  },

  // ----------------- api to delete user ----------------- 
  async deleteUser(req, res) {
    let userId = req.params.id;
    await User.deleteOne(
      {
        _id: userId,
      },
      (err, suc) => {
        if (err) {
          res.status(404).send("User not found");
        } else {
          if (suc.deletedCount == 1) {
            res.send("deleted");
          } else res.status(404).send("user not found");
        }
      }
    );
  },


 
  // ----------------- api to get number of admin and employees ----------------- 
  async getNumberOfUsers(req, res) {
    let employees = await User.find({
      userType: "Site Worker",
    });
    let admin = await User.find({
      userType: "Admin",
    });

    let verified = await User.find({
      verified: false,
    });

    let allUsers = await User.find({
      
    });
    let data = {
      employees : employees.length,
      admin : admin.length,
      allUsers : allUsers.length,
      unverified: verified.length,
    }
      res.status(200).send({
        data: data,
      });
    

  },
};

export default userController;

// router.post("/login", async (req, res) => {
// });

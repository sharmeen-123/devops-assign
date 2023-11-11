"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const shifts_model_1 = __importDefault(require("../models/shifts.model"));
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
    oldPassword: Joi.string().required(),
    password: Joi.string().required(),
});
//validation to make user active
const activeUserValidationSchema = Joi.object({
    active: Joi.boolean().required(),
});
const userController = {
    // ----------------- api to update user ----------------- 
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // checking for validation
            const { error } = updateValidationSchema.validate(req.body);
            if (error) {
                console.log(error.details[0].message);
                res.status(400).send(error.details[0].message);
            }
            else {
                let id = req.params.id;
                let updatedUser = req.body;
                // console.log("image ==> ",updatedUser.image)
                // const url = await uploadImage(updatedUser.image);
                // updatedUser.image = url;
                // console.log("public id ==> ",url, "updated user", updatedUser)
                let name = updatedUser.name.split(" ");
                const checkName = (name) => {
                    if (name !== "") {
                        console.log("return");
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                let namee = name.filter(checkName);
                // update user
                let update;
                if (updatedUser.password) {
                    const salt = yield bcrypt.genSalt(10);
                    updatedUser.password = yield bcrypt.hash(updatedUser.password, salt);
                    console.log("password", updatedUser.password);
                    console.log("id", id);
                    update = yield user_model_1.default.findOneAndUpdate({ _id: id }, {
                        firstName: namee[0],
                        lastName: namee[1],
                        password: updatedUser.password,
                        email: updatedUser.email,
                        phone: updatedUser.phone,
                        image: updatedUser.image,
                        address: updatedUser.address,
                    });
                }
                else {
                    update = yield user_model_1.default.findOneAndUpdate({ _id: id }, {
                        firstName: namee[0],
                        lastName: namee[1],
                        email: updatedUser.email,
                        phone: updatedUser.phone,
                        image: updatedUser.image,
                        address: updatedUser.address,
                    });
                }
                if (!update) {
                    console.log("error");
                    res.status(400).send("Error");
                }
                else {
                    res.status(200).send({
                        data: "data updated successfully",
                    });
                }
            }
        });
    },
    // ----------------- api to update user ----------------- 
    updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // checking for validation
            const { error } = updatePasswordValidationSchema.validate(req.body);
            if (error) {
                console.log(error.details[0].message);
                res.status(400).send(error.details[0].message);
            }
            else {
                let id = req.params.id;
                let updatedUser = req.body;
                const foundUser = yield user_model_1.default.findOne({
                    _id: id,
                });
                const validPass = yield bcrypt.compare(updatedUser.oldPassword, foundUser.password);
                if (!validPass) {
                    res.status(400).send("Incorrect Password");
                }
                else {
                    const salt = yield bcrypt.genSalt(10);
                    updatedUser.password = yield bcrypt.hash(updatedUser.password, salt);
                    // update user
                    const update = yield user_model_1.default.findOneAndUpdate({ _id: id }, {
                        password: updatedUser.password,
                    });
                    if (!update) {
                        console.log("error");
                        res.status(400).send("Error");
                    }
                    else {
                        res.status(200).send({
                            data: "Password Updated",
                        });
                    }
                }
            }
        });
    },
    // ----------------- api to verify user ----------------- 
    verifyUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let data = yield user_model_1.default.find({
                _id: id,
            });
            const status = data[0].verified;
            let update;
            if (status) {
                // set verified false
                update = yield user_model_1.default.findOneAndUpdate({ _id: id }, { verified: false });
            }
            else {
                // set verified false
                update = yield user_model_1.default.findOneAndUpdate({ _id: id }, { verified: true });
            }
            if (!update) {
                res.status(400).send("User not Exists");
            }
            else {
                res.status(200).send({
                    data: "data updated successfully",
                });
            }
        });
    },
    // ----------------- api to make user active ----------------- 
    activeUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // checking for validation
            const { error } = activeUserValidationSchema.validate(req.body);
            if (error) {
                console.log(error.details[0].message);
                res.status(400).send(error.details[0].message);
            }
            else {
                let id = req.params.id;
                let updatedUser = req.body;
                // set active
                const update = yield user_model_1.default.findOneAndUpdate({ _id: id }, { active: updatedUser.active, });
                if (!update) {
                    res.status(400).send("User not Exists");
                }
                else {
                    res.status(200).send({
                        data: "data updated successfully",
                    });
                }
            }
        });
    },
    // ----------------- api to block or unblock user ----------------- 
    switchUserStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let data = yield user_model_1.default.find({
                _id: id,
            });
            const status = data[0].status;
            let update;
            // if status is blocked
            if (status === "block") {
                update = yield user_model_1.default.findOneAndUpdate({ _id: id }, { status: "unblock", });
            }
            // if status is set to unblock
            else {
                update = yield user_model_1.default.findOneAndUpdate({ _id: id }, { status: "block", });
            }
            if (!update) {
                res.status(400).send("User not Exists");
            }
            else {
                res.status(200).send({
                    data: "Status updated",
                });
            }
        });
    },
    // ----------------- api to get all users ----------------- 
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = req.query;
            let data = yield user_model_1.default.find({
                startedBy: user.startedBy,
            });
            res.status(200).send({
                data: data.reverse(),
            });
        });
    },
    // ----------------- api to get all siteWorkers ----------------- 
    getAllSiteWorkers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = req.query;
            let data = yield user_model_1.default.find({
                userType: 'Site Worker',
            });
            res.status(200).send({
                data: data.reverse(),
            });
        });
    },
    // ----------------- api to find user status (active) ----------------- 
    getUserStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = req.query;
            let users = yield user_model_1.default.find({
                startedBy: user.startedBy,
            });
            let shift = yield shifts_model_1.default.find({
                status: "active",
            });
            let userWithStatus = [];
            let obj;
            let active;
            users.map((val, ind) => {
                active = false;
                console.log("..............................");
                shift.map((val2, ind2) => {
                    // console.log("val....", val._id," val2.........", val2.userID)
                    if (val._id.toString() === val2.userID.toString()) {
                        active = true;
                        if (val.image) {
                            obj = {
                                name: val.firstName + " " + val.lastName,
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
                            };
                        }
                        else {
                            obj = {
                                name: val.firstName + " " + val.lastName,
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
                            };
                        }
                    }
                });
                if (active) {
                    userWithStatus.push(obj);
                }
            });
            // if(userWithStatus.length>0){
            res.status(200).send({
                data: userWithStatus,
            });
            // }else{
            //     res.status(400).send({
            //       data: 'data not exists',
            //     })
            //   }
        });
    },
    // ----------------- api to get particular users by matching id ----------------- 
    getOneUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let data = yield user_model_1.default.find({
                _id: id,
            });
            res.status(200).send({
                data: data,
            });
        });
    },
    // ----------------- api to get user by matching name ----------------- 
    getUserByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = req.params.name;
            let data = yield user_model_1.default.find({});
            const checkName = (data) => {
                let namee = data.firstName + " " + data.lastName;
                if (namee.toUpperCase().includes(body.toUpperCase())) {
                    return true;
                }
                else {
                    return false;
                }
            };
            let filterData = data.filter(checkName);
            res.status(200).send({
                data: filterData.reverse(),
            });
        });
    },
    // ----------------- api to delete user ----------------- 
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let userId = req.params.id;
            yield user_model_1.default.deleteOne({
                _id: userId,
            }, (err, suc) => {
                if (err) {
                    res.status(404).send("User not found");
                }
                else {
                    if (suc.deletedCount == 1) {
                        res.send("deleted");
                    }
                    else
                        res.status(404).send("user not found");
                }
            });
        });
    },
    // ----------------- api to get number of admin and employees ----------------- 
    getNumberOfUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let employees = yield user_model_1.default.find({
                userType: "Site Worker",
            });
            let admin = yield user_model_1.default.find({
                userType: "Admin",
            });
            let verified = yield user_model_1.default.find({
                verified: false,
            });
            let allUsers = yield user_model_1.default.find({});
            let data = {
                employees: employees.length,
                admin: admin.length,
                allUsers: allUsers.length,
                unverified: verified.length,
            };
            res.status(200).send({
                data: data,
            });
        });
    },
};
exports.default = userController;
// router.post("/login", async (req, res) => {
// });
//# sourceMappingURL=user.controller.js.map
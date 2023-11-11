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
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//VALIDATION
const Joi = require("@hapi/joi");
const registerValidationSchema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().required().min(3),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string(),
    userType: Joi.string().required(),
    verified: Joi.boolean().required(),
    image: Joi.string(),
    address: Joi.string(),
    // dateJoined: Joi.string().required(),
    // active: Joi.boolean().required(),
    status: Joi.string().required(),
    isAdmin: Joi.boolean(),
});
//validation for login data
const loginValidationSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(3).required(),
    job: Joi.string().required(),
});
const loginController = {
    // ----------------- Api to register user ----------------- 
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // checking for validations
            const { error } = registerValidationSchema.validate(req.body);
            if (error) {
                console.log(error.details[0].message);
                res.status(400).send(error.details[0].message);
            }
            else {
                let userData = req.body;
                let user = new user_model_1.default(userData);
                // check if user already exists
                const emailExists = yield user_model_1.default.findOne({
                    email: user.email,
                });
                if (emailExists) {
                    console.log("already exisits");
                    res.status(400).send("User Already Exists");
                }
                else {
                    // encrypting password
                    const salt = yield bcrypt.genSalt(10);
                    if (user.password) {
                        user.password = yield bcrypt.hash(user.password, salt);
                    }
                    ;
                    var today = new Date(), date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
                    user.dateJoined = date;
                    // if(user.image){
                    //   console.log("in Uploading Imagee", user.image)
                    //   const url = await uploadImage(user.image);
                    //   user.image = url;
                    // }
                    user.save((error, registeredUser) => {
                        if (error) {
                            res.send(error.message);
                            console.log(error.message);
                        }
                        else {
                            const token = jwt.sign({ _id: registeredUser._id }, process.env.TOKEN_SECRET);
                            let data = {
                                firstName: registeredUser.firstName,
                                lastName: registeredUser.lastName,
                                email: registeredUser.email,
                                phone: registeredUser.phone,
                                userType: registeredUser.userType,
                                verified: registeredUser.verified,
                                image: registeredUser.image,
                                address: registeredUser.address,
                                // active: registeredUser.active,
                                password: registeredUser.password,
                                status: registeredUser.status,
                                _id: registeredUser._id,
                            };
                            // sending response
                            res.status(200).send({
                                data: data,
                                token: token
                            });
                        }
                    });
                }
            }
        });
    },
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = loginValidationSchema.validate(req.body);
            if (error) {
                res.status(400).send(error.details[0].message);
            }
            else {
                const userData = req.body;
                const user = new user_model_1.default(userData);
                const foundUser = yield user_model_1.default.findOne({
                    email: userData.email,
                    userType: { $regex: userData.job, $options: "i" }
                });
                if (!foundUser) {
                    res.status(400).send("Email or Password is wrong");
                }
                else if (foundUser.status === 'block') {
                    res.status(400).send("Your account have been blocked by admin. Contact company for detailed information");
                }
                else if (foundUser.verified === false) {
                    res.status(400).send("Verification is pending. Contact company for information");
                }
                else {
                    const validPass = yield bcrypt.compare(user.password, foundUser.password);
                    if (!validPass) {
                        res.status(400).send("Email or Password is wrong");
                    }
                    else {
                        const token = jwt.sign({ _id: foundUser._id }, process.env.TOKEN_SECRET);
                        console.log("token******", token, "env tokenn", process.env.TOKEN_SECRET);
                        const data = {
                            name: foundUser.firstName + " " + foundUser.lastName,
                            image: foundUser.image,
                            id: foundUser._id,
                            fname: foundUser.firstName,
                            lname: foundUser.lastName,
                            email: foundUser.email,
                            phone: foundUser.phone,
                            address: foundUser.address,
                        };
                        res.status(200).send({
                            data: data,
                            token: token
                        });
                    }
                }
            }
        });
    },
};
exports.default = loginController;
// router.post("/login", async (req, res) => {
// });
//# sourceMappingURL=login.controller.js.map
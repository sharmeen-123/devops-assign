import express from "express";
import loginController from "../controller/login.controller";

const loginRouter = express.Router();

loginRouter.post("/register", loginController.register);
loginRouter.post("/login", loginController.login);

export default loginRouter;

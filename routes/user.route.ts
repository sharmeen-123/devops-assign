import express from "express";
import userController from "../controller/user.controller";

const userRouter = express.Router();

userRouter.put("/updateUser/:id", userController.updateUser);
userRouter.put("/verifyUser/:id", userController.verifyUser);
userRouter.put("/activeUser/:id", userController.activeUser);
userRouter.put("/switchUserStatus/:id", userController.switchUserStatus);
userRouter.delete("/deleteUser/:id", userController.deleteUser);
userRouter.get("/getAllUsers", userController.getAllUsers);
userRouter.get("/getAllSiteWorkers", userController.getAllSiteWorkers);
userRouter.get("/getUserStatus", userController.getUserStatus);
userRouter.get("/getOneUser/:id", userController.getOneUser);
userRouter.get("/getNumberOfUsers", userController.getNumberOfUsers);
userRouter.get("/getUserByName/:name", userController.getUserByName);

userRouter.put("/updatePassword/:id", userController.updatePassword);

export default userRouter;

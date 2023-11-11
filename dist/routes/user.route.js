"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const userRouter = express_1.default.Router();
userRouter.put("/updateUser/:id", user_controller_1.default.updateUser);
userRouter.put("/verifyUser/:id", user_controller_1.default.verifyUser);
userRouter.put("/activeUser/:id", user_controller_1.default.activeUser);
userRouter.put("/switchUserStatus/:id", user_controller_1.default.switchUserStatus);
userRouter.delete("/deleteUser/:id", user_controller_1.default.deleteUser);
userRouter.get("/getAllUsers", user_controller_1.default.getAllUsers);
userRouter.get("/getAllSiteWorkers", user_controller_1.default.getAllSiteWorkers);
userRouter.get("/getUserStatus", user_controller_1.default.getUserStatus);
userRouter.get("/getOneUser/:id", user_controller_1.default.getOneUser);
userRouter.get("/getNumberOfUsers", user_controller_1.default.getNumberOfUsers);
userRouter.get("/getUserByName/:name", user_controller_1.default.getUserByName);
userRouter.put("/updatePassword/:id", user_controller_1.default.updatePassword);
exports.default = userRouter;
//# sourceMappingURL=user.route.js.map
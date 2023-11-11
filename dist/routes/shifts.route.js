"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shifts_controller_1 = __importDefault(require("../controller/shifts.controller"));
const shiftsRouter = express_1.default.Router();
shiftsRouter.post("/startShift", shifts_controller_1.default.startShift);
shiftsRouter.put("/changeLocation/:id", shifts_controller_1.default.changeLocation);
shiftsRouter.put("/endShift/:id", shifts_controller_1.default.endShift);
shiftsRouter.get("/getActiveShifts", shifts_controller_1.default.getActiveShifts);
shiftsRouter.get("/getAllShifts", shifts_controller_1.default.getAllShifts);
shiftsRouter.get("/getShiftsOfOneUser/:userID", shifts_controller_1.default.getShiftsOfOneUser);
shiftsRouter.get("/getRecentShiftsOfOneUser/:userID", shifts_controller_1.default.getRecentShiftsOfOneUser);
shiftsRouter.get("/getShiftsAndHoursOfOneUser/:userID", shifts_controller_1.default.getShiftsAndHoursOfOneUser);
shiftsRouter.get("/getNumberOfHours/:userID", shifts_controller_1.default.getNumberOfHours);
shiftsRouter.get("/getNumberOfShifts", shifts_controller_1.default.getNumberOfShifts);
exports.default = shiftsRouter;
//# sourceMappingURL=shifts.route.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cycle_controller_1 = __importDefault(require("../controller/cycle.controller"));
const cyclesRouter = express_1.default.Router();
cyclesRouter.get("/getAllcycles", cycle_controller_1.default.getAllcycles);
exports.default = cyclesRouter;
//# sourceMappingURL=cycle.route.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_controller_1 = __importDefault(require("../controller/login.controller"));
const loginRouter = express_1.default.Router();
loginRouter.post("/register", login_controller_1.default.register);
loginRouter.post("/login", login_controller_1.default.login);
exports.default = loginRouter;
//# sourceMappingURL=login.route.js.map
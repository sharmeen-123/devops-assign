"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_controller_1 = __importDefault(require("../controller/payment.controller"));
const paymentsRouter = express_1.default.Router();
paymentsRouter.post("/addpayment", payment_controller_1.default.addpayment);
paymentsRouter.get("/getAllPayments", payment_controller_1.default.getAllPayments);
paymentsRouter.get("/getAllcycles", payment_controller_1.default.getAllcycles);
paymentsRouter.get("/getAmountPaid", payment_controller_1.default.getAmountPaid);
paymentsRouter.get("/getPaymentByName/:name", payment_controller_1.default.getPaymentByName);
paymentsRouter.delete("/deletePayment/:id", payment_controller_1.default.deletePayment);
paymentsRouter.put("/updatePayment/:id", payment_controller_1.default.updatePayment);
paymentsRouter.put("/setPaid/:id", payment_controller_1.default.setPaid);
exports.default = paymentsRouter;
//# sourceMappingURL=payment.route.js.map
import express from "express";
import paymentsController from "../controller/payment.controller";

const paymentsRouter = express.Router();

paymentsRouter.post("/addpayment", paymentsController.addpayment);
paymentsRouter.get("/getAllPayments", paymentsController.getAllPayments);
paymentsRouter.get("/getAllcycles", paymentsController.getAllcycles);
paymentsRouter.get("/getAmountPaid", paymentsController.getAmountPaid);
paymentsRouter.get("/getPaymentByName/:name", paymentsController.getPaymentByName);
paymentsRouter.delete("/deletePayment/:id", paymentsController.deletePayment);
paymentsRouter.put("/updatePayment/:id", paymentsController.updatePayment);
paymentsRouter.put("/setPaid/:id", paymentsController.setPaid);

export default paymentsRouter;
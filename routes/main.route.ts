import express from "express";
import userRouter from "./user.route";
import shiftsRouter from "./shifts.route";
import paymentsRouter from "./payment.route";
import cyclesRouter from "./cycle.route";
import loginRouter from './login.route';
import authGuard from "../middleware/authGuard.middleware";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello from server");
});
router.use("/auth", loginRouter);
router.use("/user",authGuard, userRouter);
router.use("/shifts", shiftsRouter);
router.use("/payment",authGuard, paymentsRouter);
router.use("/cycle",authGuard, cyclesRouter);

export default router;

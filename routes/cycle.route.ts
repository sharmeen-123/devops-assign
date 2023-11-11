import express from "express";
import cyclesController from "../controller/cycle.controller";

const cyclesRouter = express.Router();

cyclesRouter.get("/getAllcycles", cyclesController.getAllcycles);

export default cyclesRouter;
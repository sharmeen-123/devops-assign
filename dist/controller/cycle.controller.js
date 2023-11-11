"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cycle_model_1 = __importDefault(require("../models/cycle.model"));
const cyclesController = {
    // ----------------- api to get all cycles ----------------- 
    getAllcycles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            const dayOfMonth = now.getDate();
            let cycleDay;
            // checking in which cycle we are
            if (dayOfMonth >= 15 && dayOfMonth < 30) {
                cycleDay = dayOfMonth - 14;
            }
            else if (dayOfMonth >= 30 || dayOfMonth < 15) {
                cycleDay = dayOfMonth + 1;
            }
            console.log("cycleday.......", cycleDay);
            const thisCycle = new Date(now.getTime() - (120 * 24 * 60 * 60 * 1000) - (cycleDay * 24 * 60 * 60 * 1000)); // Subtract 120 days from the current date
            let shifts = yield cycle_model_1.default.find({ checkinTime: { $gte: thisCycle }, status: "Compeleted" });
            shifts.sort((a, b) => a.checkinTime - b.checkinTime); // sorting above array by date
            // dividing sorted shifts into cycle
            const shiftsByDate = {};
            for (const shift of shifts) {
                const date = shift.checkinTime.toDateString();
                if (!shiftsByDate[date]) {
                    shiftsByDate[date] = [];
                }
                shiftsByDate[date].push(shift);
                console.log(shift);
            }
            // grouping shifts
            const cycles = [];
            const cycleLength = 15 * 24 * 60 * 60 * 1000; // 15 days in milliseconds
            const earliestShiftTimestamp = new Date(Object.keys(shiftsByDate)[0]).getTime();
            let cycleStart = earliestShiftTimestamp;
            let cycleEnd = cycleStart + (cycleLength - 1);
            let cycleShifts = 0;
            for (const date of Object.keys(shiftsByDate)) {
                const dateMs = new Date(date).getTime();
                if (dateMs >= cycleStart && dateMs <= cycleEnd) {
                    cycleShifts += shiftsByDate[date].length;
                }
                else {
                    // cycles.push({ start: new Date(cycleStart), end: new Date(cycleEnd), shifts: cycleShifts });
                    cycles.push(cycleShifts);
                    cycleStart = cycleEnd + 1;
                    cycleEnd = cycleStart + (cycleLength - 1);
                    cycleShifts = shiftsByDate[date].length;
                }
            }
            // add last cycle
            // cycles.push({ start: new Date(cycleStart), end: new Date(cycleEnd), shifts: cycleShifts });
            cycles.push(cycleShifts);
            res.status(200).send({
                data: cycles,
            });
        });
    },
};
exports.default = cyclesController;
//# sourceMappingURL=cycle.controller.js.map
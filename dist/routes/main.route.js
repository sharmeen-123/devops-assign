"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./user.route"));
const shifts_route_1 = __importDefault(require("./shifts.route"));
const payment_route_1 = __importDefault(require("./payment.route"));
const cycle_route_1 = __importDefault(require("./cycle.route"));
const login_route_1 = __importDefault(require("./login.route"));
const authGuard_middleware_1 = __importDefault(require("../middleware/authGuard.middleware"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("hello from server");
});
router.use("/auth", login_route_1.default);
router.use("/user", authGuard_middleware_1.default, user_route_1.default);
router.use("/shifts", shifts_route_1.default);
router.use("/payment", authGuard_middleware_1.default, payment_route_1.default);
router.use("/cycle", authGuard_middleware_1.default, cycle_route_1.default);
exports.default = router;
//# sourceMappingURL=main.route.js.map
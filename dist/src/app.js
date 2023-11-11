"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const main_route_1 = __importDefault(require("../routes/main.route"));
const socket_1 = __importDefault(require("../routes/socket"));
const http_1 = __importDefault(require("http"));
const mongoose = require("mongoose");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
        this.http = new http_1.default.Server(this.app);
        this.io = require("socket.io")(this.http, {
            withCredentials: true,
            transports: ["websocket", "polling"],
            cors: {
                // origin: "http://127.0.0.1:3000",
                origin: '*',
            },
        });
        this.PORT = process.env.PORT || 8000;
        this.initMiddleware();
        this.connectToMongoDB();
        this.initRoutes();
    }
    initMiddleware() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        dotenv_1.default.config();
    }
    connectToMongoDB() {
        const db = process.env.MONGO_CONNECTION;
        mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }, (err, db) => {
            if (err) {
                console.log("err", err);
            }
            else {
                console.log("db connected");
            }
        });
    }
    initRoutes() {
        this.app.use("/", main_route_1.default);
        (0, socket_1.default)(this.io);
    }
    createServer() {
        this.http.listen(this.PORT, () => {
            console.log("Server started at port 8000");
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map
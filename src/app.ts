import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "../routes/main.route";
import initSocket from "../routes/socket";
import http from "http";
import fileUpload = require('express-fileupload')
const mongoose = require("mongoose");

class App {
  public app: any;
  public PORT: any;
  public db: any;
  public http: any;
  public io: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.http = new http.Server(this.app);
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
  private initMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
    dotenv.config();
  }
  private connectToMongoDB() {
    const db = process.env.MONGO_CONNECTION;
    mongoose.connect(
      db,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
      (err, db) => {
        if (err) {
          console.log("err", err);
        } else {
          console.log("db connected");
        }
      }
    );
  }
  private initRoutes() {
    this.app.use("/", router);
    initSocket(this.io);
  }
  public createServer() {
    this.http.listen(this.PORT, () => {
      console.log("Server started at port 8000");
    });
  }
}

export default App;

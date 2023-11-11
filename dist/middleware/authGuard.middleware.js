"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
//function to verify authentication
function default_1(req, res, next) {
    const token = req.header("authorization");
    console.log("req.header is", req.headers);
    if (!token) {
        res.status(401).send("Access Denied");
    }
    else {
        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            res.user = verified;
            next();
        }
        catch (err) {
            res.status(400).send("Invalid Token");
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=authGuard.middleware.js.map
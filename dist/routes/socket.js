"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let sockets = [];
function initSocket(io) {
    io.on("connection", (socket) => {
        console.log("socket connected... id: " + socket.id);
        socket.on("disconnect", () => {
            console.log(socket.id);
        });
    });
}
exports.default = initSocket;
//# sourceMappingURL=socket.js.map
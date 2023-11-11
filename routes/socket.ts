let sockets = [];

export default function initSocket(io) {
  io.on("connection", (socket) => {
    console.log("socket connected... id: " + socket.id);

    socket.on("disconnect", () => {
      console.log(socket.id);
    });
  });
}

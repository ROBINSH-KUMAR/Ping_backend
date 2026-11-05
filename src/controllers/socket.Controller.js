
const registerSocketHandlers = (io) => {

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Listen for messages
    socket.on("send-message", (data) => {
      io.to(data.roomId).emit("receive-message", data);
    });

    // Create / join group
    socket.on("join-group", (groupId) => {
      socket.join(groupId);

      socket.emit("group-joined", {
        groupId,
        message: "Successfully joined group",
      });
    });

    // Leave group
    socket.on("leave-group", (groupId) => {
      socket.leave(groupId);
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

};

export default registerSocketHandlers;

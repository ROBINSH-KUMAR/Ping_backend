import { Server } from "socket.io";
import registerSocketHandlers from "../controllers/socket.Controller.js";

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    },
  });
  console.log("Socket.IO server initialized");
  registerSocketHandlers(io);

  return io;
};

export default initializeSocket;

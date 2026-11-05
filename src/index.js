import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";
import initializeSocket from "./Socket/index.js";
dotenv.config();

const PORT = process.env.PORT || 8000;

// Create HTTP server
const server = createServer(app);

// Attach Socket.IO
const io = initializeSocket(server);

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`App is running on http://localhost:${PORT}`);
    });

    server.on("error", (err) => {
      console.error("Server Error:", err);
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });

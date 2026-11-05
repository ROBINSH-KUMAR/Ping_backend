
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const socketAuth = async (socket, next) => {
  try {
    // Get token from Socket.IO handshake
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Unauthorized: Access token required"));
    }

    // Verify JWT
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    // Find user
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return next(new Error("Unauthorized: User not found"));
    }

    // Attach authenticated user to socket
    socket.user = user;

    next();
  } catch (error) {
    next(new Error("Unauthorized: Invalid or expired token"));
  }
};

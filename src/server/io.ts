import { Server } from "socket.io";

let io: Server | null = null;

export const setIOInstance = (ioInstance: Server) => {
  io = ioInstance;
};

export const getIOInstance = (): Server => {
  if (!io) {
    throw new Error("Socket.io instance not initialized yet!");
  }
  return io;
};

import Fastify from "fastify";
import cors from "@fastify/cors";
import { Server } from "socket.io";
import { createServer } from "http";
import { setIOInstance } from './io'
import Sockets from "./sockets/sockets";

const app = Fastify();
const PORT = 3000

await app.register(cors, {
  origin: "http://localhost:5173",
});

const httpServer = createServer(app.server);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

setIOInstance(io)
Sockets()

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
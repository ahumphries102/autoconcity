import { getIOInstance } from "../io";
import  { type UserInfo, type Socket, UserRole } from "../../types/socket.d";
let listOfUsers: UserInfo[] = [];
let serverChatLog: string[] = [];

const createUser = (socket: Socket, userInfo: UserInfo): UserInfo => {
  socket.userInfo = userInfo;
  return socket.userInfo;
};

const createListOfUsers = (socket: Socket): void => {
  if (socket.userInfo) {
    if (listOfUsers.length === 0) {
      socket.userInfo.playerId = UserRole.PlayerOne;
    }
    if (listOfUsers.length === 1) {
      socket.userInfo.playerId = UserRole.PlayerTwo;
    }
    if (listOfUsers.length > 2) {
      socket.userInfo.spectator = true;
    }
  }
  listOfUsers.push(socket.userInfo!);
  socket.emit("update-user", socket.userInfo)
};

const activateChat = (io: any, socket: Socket) => {
  socket.on("chat-message", (clientMessage) => {
    if (socket.userInfo) {
      serverChatLog.push(`${socket.userInfo.userName}: ${clientMessage}`);
      io.to(socket.userInfo.roomName).emit("updateChatLog", serverChatLog);
    }
  });
};

const leaveChat = (io: any, socket: Socket) => {
  // leave the room
  socket.on("left-room", () => {
    if (socket.userInfo) {
      listOfUsers = listOfUsers.filter((e) => e.userName !== socket.userInfo?.userName);
      serverChatLog.push(`${socket.userInfo?.userName} has left the room`);
      io.to(socket.userInfo.roomName).emit("user-disconnected", {
        listOfUsers,
        serverChatLog,
      });
    }
  });
};

export default () => {
  const io = getIOInstance();
  io.on("connection", (socket) => {
    // Join the room
    socket.on("join-room", (userInfo) => {
      socket.join(userInfo.roomName)
      // step 1, save user to a socket
      createUser(socket, userInfo);
      // step 2, join room and add user to list of users
      createListOfUsers(socket);

      // step 3, update the server chat log and let everyone else know who joined
      serverChatLog.push(userInfo.userName + " has joined the room");

      // step 4, join the room specified
      socket.join(userInfo.roomName);

      // step 5, tell all the users in the room who just joined
      io.to(userInfo.roomName).emit("update-users", listOfUsers, serverChatLog);

      // step 6, tell everyone else who just joined
      socket.broadcast.to(userInfo.roomName).emit("user-joined", userInfo.userName);
      activateChat(io, socket);
    });

    leaveChat(io, socket);
  });
};

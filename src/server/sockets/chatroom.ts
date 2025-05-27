import { getIOInstance } from "../io";

let listOfUsers: string[] = [];
let serverChatLog: string[] = [];

export default () => {
  const io = getIOInstance();
  io.on("connection", (socket) => {
    // Join the room
    socket.on("join-room", (userInfo) => {
      // step 1, save user to a socket
      socket.userInfo = userInfo;

      // step 2, join room and add user to list of users
      listOfUsers.push(socket.userInfo!.userName);
      
      console.log(listOfUsers.length)
      if(listOfUsers.length < 2 && socket.userInfo) {
        socket.userInfo.playerId = 'player 1'
      }
      if(listOfUsers.length > 1 && socket.userInfo) {
        socket.userInfo.playerId = 'player 2'
      }
      socket.emit("update-user", userInfo)
      console.log(socket.userInfo?.playerId)
      // step 3, update the server chat log and let everyone else know who joined
      serverChatLog.push(userInfo.userName + " has joined the room");

      // step 4, join the room specified
      socket.join(userInfo.roomId);

      // step 5, tell all the users in the room who just joined
      io.to(userInfo.roomId).emit("update-users", listOfUsers, serverChatLog);

      // step 6, tell everyone else who just joined
      socket.broadcast.to(userInfo.roomId).emit("user-joined", userInfo.userName);
      activateChat();
    });

    // send client messages
    const activateChat = () => {
      socket.on("chat-message", (clientMessage) => {
        console.log("taco");
        if (socket.userInfo) {
          serverChatLog.push(`${socket.userInfo.userName}: ${clientMessage}`);
          io.to(socket.userInfo.roomId).emit("updateChatLog", serverChatLog);
        }
      });
    };

    // leave the room
    socket.on("left-room", () => {
      if (socket.userInfo) {
        listOfUsers = listOfUsers.filter((e) => e !== socket.userInfo!.userName);
        serverChatLog.push(`${socket.userInfo?.userName} has left the room`);
        io.to(socket.userInfo.roomId).emit("user-disconnected", {
          listOfUsers,
          serverChatLog,
        });
      }
      

    });
  });
};

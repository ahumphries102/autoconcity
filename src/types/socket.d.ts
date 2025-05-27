// /types/socket.d.ts
import { Socket } from "socket.io";


export interface UserInfo {
  playerId: string;
  id: string;
  userName: string;
  roomId: string;
  roomName: string;
  socketId?: string;
}

declare module "socket.io" {
  interface Socket {
    userInfo?: UserInfo;
  }
}

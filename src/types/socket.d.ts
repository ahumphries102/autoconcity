// /types/socket.d.ts
import { Socket } from "socket.io";

export enum UserRole {
  PlayerOne = 1,
  PlayerTwo = 2,
  Spectator = 3
}

export interface UserInfo {
  playerId: UserRole | null;
  roomName: string;
  socketId?: string;
  userName: string;
}

declare module "socket.io" {
  interface Socket {
    userInfo?: UserInfo;
  }
}
export { Socket };

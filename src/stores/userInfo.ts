import { defineStore } from "pinia";
import { ref } from "vue";
import type { UserInfo, UserRole } from "../types/socket"

export const PlayerInfo = defineStore("userInfo", () => {
  let playerInfo = ref<UserInfo>({
    roomName: "",
    userName: "",
    playerId: null,
  });

  return { playerInfo }
});

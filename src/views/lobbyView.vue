<template>
  <v-card width="25%">
    <v-card-actions class="d-flex flex-column">
      <v-text-field placeholder="Enter User Name" v-model="playerInfo.userName" width="100%" />
      <v-text-field placeholder="Enter Room Name" v-model="playerInfo.roomName" width="100%" />
    </v-card-actions>
    <v-card-actions>
      <v-btn :disabled="userNameAndRoomFilledOut" @click="goToChat">Begin Game</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
  import { computed, onMounted, ref } from "vue";
  import router from "@/router/router";
  import { PlayerInfo } from "../stores/userInfo";

  const playerInfo = PlayerInfo().playerInfo;
  const userNameAndRoomFilledOut = computed(() => {
    if (playerInfo.roomName.length >= 3 && playerInfo.userName.length >= 3) {
      return false;
    }
    return true;
  });
  function goToChat() {
    router.push({
      name: "chatRoom",
      params: { userName: playerInfo.userName, roomName: playerInfo.roomName },
    });
  }
</script>

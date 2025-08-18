<template>

    <v-card width="25%">
      <v-card-actions class="d-flex flex-column">
        <router-link to="/lobby">
          <v-btn>Start Game</v-btn>
        </router-link>
        <v-btn>Options</v-btn>
      </v-card-actions>  
    </v-card>
</template>

<script setup lang="ts">
  import { PlayerInfo } from "@/stores/userInfo"

  const playerInfo = PlayerInfo().playerInfo

  if(playerInfo.userName && playerInfo.roomName) {
    playerInfo.userName = ""
    playerInfo.roomName = ""
  }
</script>

<style></style>

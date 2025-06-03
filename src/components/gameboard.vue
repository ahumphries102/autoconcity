<template>
  <div style="width: 75%; height: 500px; background: green; position: relative; padding: 2%">
    <h2>{{ listOfUsers }}</h2>
    <div
      v-for="(users, ind) in listOfUsers"
      :key="ind"
      :class="['taco']"
      :style="cardPosition(users.playerId)">
      {{ users.userName }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PlayerInfo } from "@/stores/userInfo";
  import { storeToRefs } from "pinia";
  import { computed } from "vue";

  const playerInfos = PlayerInfo();
  const { listOfUsers, playerInfo } = storeToRefs(playerInfos);
  const cardPosition = (otherPlayer: number) => {
    if (playerInfo.value.playerId < otherPlayer) {
      return {
        "background-color": "pink",
        top: "0",
      };
    } else {
      console.log("taco");
      return {
        "background-color": "yellow",
        bottom: "0",
      };
    }
  };
</script>

<style>
  .taco {
    width: 50px;
    height: 50px;
    position: absolute;
  }
</style>

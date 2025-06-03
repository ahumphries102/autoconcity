<template>
  <div style="width: 75%; height: 500px; background: green; position: relative; padding: 2%">
    <div v-for="(users, ind) in listOfUsers" :key="ind" :class="['taco']" :style="cardPosition">{{ users.userName }}</div>
  </div>
</template>

<script setup lang="ts">
  import { PlayerInfo } from "@/stores/userInfo";
  import { storeToRefs } from "pinia";
  import { computed } from "vue";

  const playerInfos = PlayerInfo();
  const { listOfUsers, playerInfo } = storeToRefs(playerInfos);
  const cardColor = computed(() => {
    return "crab";
  });
  const cardPosition = computed(() => {
    console.log(playerInfo.value.userName)
    const otherPlayer = listOfUsers.value.find((e) => e.playerId !== playerInfo.value.playerId);

    if (otherPlayer) {
      return {
        'background-color': 'pink',
        bottom: "0",
      };
    } else {
      return {
        'background-color': 'yellow',
        top: "0",
      };
    }
  });
</script>

<style>
  .taco {
    width: 50px;
    height: 50px;
    position: absolute;
  }
</style>

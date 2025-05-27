<template>
  <div style="width: 75%; height: 500px; background: green; position: relative; padding: 2%">
    {{ playerInfo }}
    <div :style="{ width: '50px', height: '50px', 'background-color': cardColor, position: 'absolute', transform: playerInfo.playerId > 1 ? 'translate(0)':'translateY(300px)' }"></div>
  </div>
</template>

<script setup lang="ts">
  import { PlayerInfo } from "@/stores/userInfo";
  import { computed } from "vue";

  const playerInfo = PlayerInfo().playerInfo
  const cardColor = computed(() => {
    if (playerInfo.playerId === 1) {
      return "pink";
    }
    if (playerInfo.playerId === 2) {
      return "aqua";
    }
    return "blue"
  });
</script>

<style></style>

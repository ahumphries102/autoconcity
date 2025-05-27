<template>
  <div style="width: 75%; height: 500px; background: green;">
    <div :style="{width: '50px', height: '50px', 'background-color': cardColor}"></div>
  </div>
</template>

<script setup lang="ts">
    import { useCounterStore } from "@/stores/counter";
import { computed } from "vue";
    const counterStore = useCounterStore()
    console.log(counterStore.userInfo)

    const cardColor = computed(() => {
      if (counterStore.userInfo.playerId === 'player 1') {
        return 'pink'
      }
      if (counterStore.userInfo.playerId === 'player 2') {
        return 'red'
      }
    })
</script>

<style>

</style>
<template>
  <Board/>
  <RouterView />
</template>

<script setup lang="ts">
import Board from '@/components/gameboard.vue'
import { onMounted } from 'vue';
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
    withCredentials: true,
    transports: ["websocket"],
  });

onMounted(() => {
  socket.emit('gameBegins')
})
</script>
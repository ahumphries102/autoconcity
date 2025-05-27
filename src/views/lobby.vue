<template>
  <v-card width="25%">
    <v-card-actions class="d-flex flex-column">
      <v-text-field placeholder="Enter User Name" v-model="userName" width="100%" />
      <v-text-field placeholder="Enter Room Name" v-model="roomName" width="100%" />
    </v-card-actions>
    <v-card-actions>
      <v-btn :disabled="userNameAndRoomFilledOut" @click="goToChat">Begin Game</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
  import { computed, type Ref, ref } from "vue";
  import router from "@/router/router";
  const userName: Ref<string> = ref("");
  const roomName: Ref<string> = ref("");
  const userNameAndRoomFilledOut = computed(() => {
    return roomName.value.length >= 3 && userName.value.length >= 3 ? false : true;
  });
  function goToChat() {
    router.push({
      name: "chatRoom",
      params: { userName: userName.value, roomName: roomName.value },
    });
  }
</script>

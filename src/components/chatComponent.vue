<template>
  <div class="d-flex" style="width: 25%">
    <v-card height="475px">
      <v-card-text style="overflow: auto; height: 60%">
        <p v-for="(msg, index) in clientChatLog" :key="index">{{ msg }} </p>
      </v-card-text>
      <v-card-actions class="d-flex, flex-column">
        <v-text-field v-model="newMessage" label="Message" style="width: 100%" />
        <v-btn @click="sendMessage">Send</v-btn>
      </v-card-actions>
    </v-card>
    <v-list>
      <v-list-item :title="'Hello ' + props.userName" :subtitle="props.roomName"></v-list-item>
      <v-divider></v-divider>
      <ul>
        <li v-for="(userNames, index) in listOfUsers" :key="index">{{ userNames }}</li>
      </ul>
    </v-list>
  </div>
</template>

<script setup lang="ts">
  import { watch, ref, onUnmounted, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { io } from "socket.io-client";
  import type { UserInfo } from '../types/socket'
  import { useCounterStore } from "@/stores/counter";
  
  const counterStore = useCounterStore()

  const props = defineProps<{
    userName: string;
    roomName: string;
  }>();
  const socket = io("http://localhost:3000", {
    withCredentials: true,
    transports: ["websocket"],
  });
  const route = useRoute();
  const hasJoined = ref(false);
  const clientChatLog = ref<string[]>([]);
  const newMessage = ref("");
  const listOfUsers = ref<UserInfo[]>([]);

  let userInfo: UserInfo = {
    roomId: route.params.id as string,
    roomName: props.roomName,
    id: socket.id as string,
    userName: props.userName,
    playerId: ''
  };

  onMounted(() => {
    // step 1, join the room and submit a users info
    socket.emit("join-room", userInfo);
    window.addEventListener("beforeunload", browserClosed);
  });

  // step 2, once a user has joined

  socket.on("current-users", (users) => {
    listOfUsers.value = users;
  });

  socket.on("update-user", updatedUserInfo => {
    counterStore.userInfo = updatedUserInfo
  })

  socket.on("update-users", (allUsers, updatedMessages) => {
    listOfUsers.value = allUsers;
    clientChatLog.value = updatedMessages
  });

  onUnmounted(() => {
    socket.emit("left-room", userInfo.userName);
    socket.disconnect();
    socket.off();
    window.removeEventListener("beforeunload", browserClosed);
  });

  socket.on("user-disconnected", (updatedRoomInfo) => {
    listOfUsers.value = updatedRoomInfo.listOfUsers;
    clientChatLog.value = updatedRoomInfo.serverChatLog
  });

  function sendMessage() {
    socket.emit("chat-message", newMessage.value.trim());
    newMessage.value = "";
  }
  socket.on("updateChatLog", (message) => {
    clientChatLog.value = message
  });
  const browserClosed = () => {
    socket.emit("left-room");
    socket.disconnect();
    socket.off();
  };
  watch(listOfUsers, (newVal, oldVal) => {
    if (newVal.length > oldVal.length) {
      return (hasJoined.value = true);
    } else {
      return (hasJoined.value = false);
    }
  });
</script>


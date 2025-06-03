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
        <li v-for="(userInfo, index) in listOfUsers" :key="index">{{ userInfo.userName }}</li>
      </ul>
    </v-list>
  </div>
</template>

<script setup lang="ts">
  import { watch, ref, onUnmounted, onMounted } from "vue";
  import { io } from "socket.io-client";
  import { PlayerInfo } from "@/stores/userInfo";
  import { storeToRefs } from 'pinia'

  const playerStore = PlayerInfo()
  const { playerInfo, listOfUsers } = storeToRefs(playerStore)

  const props = defineProps<{
    userName: string;
    roomName: string;
  }>();
  const socket = io("http://localhost:3000", {
    withCredentials: true,
    transports: ["websocket"],
  });

  const hasJoined = ref(false);
  const clientChatLog = ref<string[]>([]);
  const newMessage = ref("");


  onMounted(() => {
    // step 1, join the room and submit a users info
    socket.emit("join-room", playerInfo.value);
    window.addEventListener("beforeunload", browserClosed);
  });

  // step 2, once a user has joined
  socket.on("current-users", (users) => {
    listOfUsers.value = users;
  });

  socket.on("update-user", updatedUserInfo => {
    playerInfo.value.playerId = updatedUserInfo.playerId
  })

  socket.on("update-users", (allUsers, updatedMessages) => {
    listOfUsers.value = allUsers;
    clientChatLog.value = updatedMessages
  });

  onUnmounted(() => {
    socket.emit("left-room", playerInfo.value.userName);
    socket.disconnect();
    socket.off();
    window.removeEventListener("beforeunload", browserClosed);
  });

  socket.on("user-disconnected", (updatedRoomInfo) => {
    if(playerInfo.value) {
      listOfUsers.value = updatedRoomInfo.listOfUsers.value;
    }
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
  watch(listOfUsers.value, (newVal, oldVal) => {
    if (newVal.length > oldVal.length) {
      return (hasJoined.value = true);
    } else {
      return (hasJoined.value = false);
    }
  });
</script>


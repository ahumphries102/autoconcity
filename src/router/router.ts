import { createRouter, createWebHistory } from "vue-router";
import ChatRoomContent from "@/components/chatComponent.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "start",
      component: () => import("@/views/startScreen.vue"),
    },
    {
      path: "/lobby",
      name: "lobby",
      props: true,
      component: () => import("@/views/lobbyView.vue"),
    },
    {
      path: "/playfield",
      name: "playfield",
      component: () => import("@/views/playfieldView.vue"), // layout
      children: [
        {
          path: ":userName/:roomName",
          name: "chatRoom",
          component: ChatRoomContent, // actual chat logic
          props: route => ({
            roomName: route.params.roomName,
            userName: route.params.userName,
          }),
        },
      ],
    },
  ],
});

export default router;

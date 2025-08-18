<template>
  <div style="width: 75%; height: 500px; background: green; position: relative; padding: 2%">
    <h2>{{ listOfUsers }}</h2>
    <div class="d-flex justify-content" style="background-color: brown; position: absolute; bottom: 0;">
      <div cols="2" v-for="(card, ind) in currentHand" :key="ind" :class="listOfUsers.taco"> {{ card }} </div>
    </div>
    <div class="d-flex justify-content" style="background-color: brown; position: absolute; top: 0;">
      <div cols="2" v-for="(card, ind) in currentHand" :key="ind"> {{ card }} </div>
    </div>
    <v-btn @click="deck.drawCard">Draw Card</v-btn>
  </div>
</template>

<script setup lang="ts">
  import { PlayerInfo } from "@/stores/userInfo";
  import { Deck } from "@/stores/deck";
  import { storeToRefs } from "pinia";
  import { computed, onMounted, ref } from "vue";

  const deck = Deck();
  const playerInfos = PlayerInfo();
  const { listOfUsers, playerInfo } = storeToRefs(playerInfos);

  onMounted(() => {
    deck.beginningGame = true
    deck.drawCard()
  });
  const currentHand = computed(() => {
    return deck.hand
  })
  const cardPosition = (otherPlayer: string) => {
    if (playerInfo.value.userName !== otherPlayer) {
      return {
        "background-color": "pink",
        top: "0",
      };
    } else {
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
    background-color: pink;
    margin-left: 3px;
  }
    .taco2 {
    width: 50px;
    height: 50px;
    background-color: yellow;
    margin-left: 3px;
  }
</style>

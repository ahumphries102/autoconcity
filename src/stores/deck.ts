import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";

export const Deck = defineStore("deck", () => {
  // Step 1: Create a basic deck of 52 cards
  function createDeck() {
    const suits = ["♠", "♥", "♦", "♣"];
    const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const deck = [];

    for (let suit of suits) {
      for (let rank of ranks) {
        deck.push(`${rank}${suit}`);
      }
    }

    return deck;
  }

  // Step 2: Shuffle the deck using Fisher-Yates algorithm
  function shuffleDeck(deck: string[]): string[] {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]]; // swap
    }

    return deck;
  }

  // Usage:
  const deck = createDeck();
  let beginningGame: Ref<boolean> = ref(false);
  const shuffledDeck = shuffleDeck([...deck]); // Use a copy to preserve original

  let hand: Ref<string[]> = ref([]);

  const drawCard = (): void => {
    const card = shuffledDeck.shift();
    if (card !== undefined) {
      if (hand.value.length < 4 && beginningGame.value === true) {
        hand.value.push(card);
        drawCard();
        return;
      } else {
        beginningGame.value = false; // End the beginning game phase after drawing 5 cards
        hand.value.push(card);
      }
    }
  };
  return {
    beginningGame,
    drawCard,
    hand,
    shuffledDeck,
  };
});

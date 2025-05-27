<template>
  <v-app>
    <nav>
      <RouterLink :to="{ name: 'start' }">Go to Home</RouterLink>
    </nav>
    <div class="d-flex justify-center align-center fill-height">
    <RouterView />
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

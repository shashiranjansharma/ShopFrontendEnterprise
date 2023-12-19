<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-card class="mx-auto">
    <v-layout full-height>
      <v-app-bar color="primary">
        <!-- <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template> -->
        <v-app-bar-title>Shop App</v-app-bar-title>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/borrowers">Borrowers</RouterLink>
        <RouterLink to="/category">Categories</RouterLink>
        <RouterLink to="/product">Products</RouterLink>
      </v-app-bar>
      <v-main class="app-main-container">
        <RouterView />
      </v-main>
    </v-layout>
  </v-card>
</template>

<style scoped>
.app-main-container {
  margin-top: 16px;
  height: calc(100vh - 16px);
  overflow-y: auto;
}
</style>

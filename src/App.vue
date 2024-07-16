<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { VCard } from 'vuetify/components/VCard'
import { VMain } from 'vuetify/components/VMain'
import { VLayout } from 'vuetify/components/VLayout'
import { VAppBar, VAppBarTitle } from 'vuetify/components/VAppBar'
import { computed } from 'vue';
const isAuthenticated = computed(() => localStorage.getItem('shop_app_token'));

</script>

<template>
  <v-card class="mx-auto" :key="isAuthenticated?.toString()">
    <v-layout full-height>
      <v-app-bar v-if="isAuthenticated" color="primary">
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
  margin: 16px;
  height: calc(100vh - 16px);
  overflow-y: auto;
}
</style>

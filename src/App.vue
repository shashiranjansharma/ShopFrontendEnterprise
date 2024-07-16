<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { VCard } from 'vuetify/components/VCard'
import { VMain } from 'vuetify/components/VMain'
import { VLayout } from 'vuetify/components/VLayout'
import { VAppBar, VAppBarTitle } from 'vuetify/components/VAppBar'
import { computed } from 'vue';
import router from './router';
import { useAuthStore } from './stores/auth';
const authStore = useAuthStore();

const isLoggedIn = computed(() => authStore.isLoggedIn )


function logout(){
  authStore.logout()
  router.push({name: 'Login'})
}
</script>

<template>
  <v-card class="mx-auto">
    <v-layout full-height>
      <v-app-bar v-if="isLoggedIn" color="primary">
        <v-app-bar-title>Shop App</v-app-bar-title>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/borrowers">Borrowers</RouterLink>
        <RouterLink to="/category">Categories</RouterLink>
        <RouterLink to="/product">Products</RouterLink>
        <v-btn icon @click="logout">
          <v-icon>mdi-export</v-icon>
        </v-btn>
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
</style>./stores/auth

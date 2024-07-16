import { computed, reactive } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const state = reactive({
    token: localStorage.getItem('shop_app_token')
  });

  function logout() {
    state.token = null;
    localStorage.removeItem('shop_app_token');
  }

  function login(token: string) {
    state.token = token;
    localStorage.setItem('shop_app_token', token);
  }

  const isLoggedIn = computed(() => !!state.token);

  return { isLoggedIn, logout, login };
});

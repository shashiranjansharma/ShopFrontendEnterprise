import { computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import Cookies from "js-cookie";


export const useAuthStore = defineStore('auth', () => {
  const state = reactive({
    token: Cookies.get('shop_app_token')
  });

  function logout() {
    state.token = undefined;
    Cookies.remove('shop_app_token');
  }

  function login(token: string) {
    Cookies.set('shop_app_token', token);
    state.token = token;
  }

  const isLoggedIn = computed(() => state.token);

  return { isLoggedIn, logout, login };
});

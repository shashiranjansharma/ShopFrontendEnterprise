import './assets/main.css';
import { useAxios } from './axios';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify();

import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(vuetify);
const axiosInstance = useAxios();
app.provide('$axios', axiosInstance);
app.mount('#app');

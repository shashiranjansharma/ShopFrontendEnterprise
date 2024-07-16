import './assets/main.css';
import axios from 'axios';
import { useAxios } from './axios';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify();

import App from './App.vue';
import router from './router';

// const { protocol, hostname } = window.location;
const axiosInstance = useAxios();
// axios.create({
//     withCredentials: true,
//     baseURL: `${protocol}//dt1.${hostname}:80/api/`
// });
const app = createApp(App);
app.provide('$axios', axiosInstance);
app.use(createPinia());
app.use(router);
app.use(vuetify);
app.mount('#app');

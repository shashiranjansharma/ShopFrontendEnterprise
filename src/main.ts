import './assets/main.css'
import axios from 'axios'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives
})

import App from './App.vue'
import router from './router'

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:8001/'
})
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
const app = createApp(App)
// app.config.globalProperties.$axios = { ...axiosInstance }
app.provide('$axios', axiosInstance)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/borrowers',
      name: 'borrowers',
      component: () => import('../views/MainLayout.vue')
    }
  ]
})

export default router

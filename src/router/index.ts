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
      component: () => import('../views/BorrowersLayout.vue')
    },
    {
      path: '/category',
      name: 'Category',
      component: () => import('../views/CategoryLayout.vue')
    },
    {
      path: '/product',
      name: 'Products',
      component: () => import('../views/ProductsLayout.vue')
    }
  ]
})

export default router

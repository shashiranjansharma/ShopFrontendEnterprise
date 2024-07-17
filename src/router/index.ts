import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useAxios } from '@/axios';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { protedted: true },
      component: HomeView
    },
    {
      path: '/borrowers',
      name: 'borrowers',
      meta: { protedted: true },
      component: () => import('../views/BorrowersLayout.vue')
    },
    {
      path: '/category',
      name: 'Category',
      meta: { protedted: true },
      component: () => import('../views/CategoryLayout.vue')
    },
    {
      path: '/product',
      name: 'Products',
      meta: { protedted: true },
      component: () => import('../views/ProductsLayout.vue')
    },
    {
      path: '/auth/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue')
    },
  ]
});

router.beforeEach(async (to: any) => {
  const isAuthenticated = localStorage.getItem('shop_app_token');
  if (isAuthenticated) useAxios();
  const isPublic = ['Login'].includes(to.name);
  if (!isAuthenticated && !isPublic) {
    return { name: 'Login' };
  } else if (isAuthenticated && isPublic) {
    return { name: 'home' };
  } else if (isAuthenticated && !to.name) {
    return { name: 'home' };
  }
});

export default router;

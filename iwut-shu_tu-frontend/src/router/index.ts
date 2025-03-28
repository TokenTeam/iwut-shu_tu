import { createRouter, createWebHistory } from 'vue-router'
import BookList from '../views/BookList.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'booklist',
      component: BookList,
    },
    {
      path: '/seller',
      name: 'seller',
      component: () => import('../views/SellerView.vue'),
    },
    {
      path:'/manage',
      name:'manage',
      component:()=>import('../views/ManageView.vue'),
    }
  ],
})

export default router

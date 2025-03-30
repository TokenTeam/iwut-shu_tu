import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'booklist',
      component:  () => import('../views/BookList.vue'),
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
    },
    {
      path:'/pic',
      name:'pic',
      component:()=>import('../views/PicView.vue')
    }
  ],
})

export default router

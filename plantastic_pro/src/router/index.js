import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [],
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/PlantsView.vue')
    },
    {
      path: '/evidencija/:id',
      name: 'evidencija',
      component: () => import('@/views/EvidencijaView.vue')
    },
    { path: '/dodavanje',
     name: 'dodavanje',
    component: () => import('@/views/DodavanjeView.vue')
  ],
})

export default router
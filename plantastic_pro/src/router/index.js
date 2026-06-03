import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') },
    { path: '/', name: 'home', component: () => import('@/views/PlantsView.vue'), meta: { zahtijevaPrijavu: true, samKorisnik: true } },
    { path: '/evidencija', component: () => import('@/views/EvidencijaZalijevanjaView.vue'), meta: { zahtijevaPrijavu: true, samKorisnik: true } },
    { path: '/evidencija/:id', component: () => import('@/views/EvidencijaView.vue'), meta: { zahtijevaPrijavu: true, samKorisnik: true } },
    { path: '/dodavanje', component: () => import('@/views/DodavanjeView.vue'), meta: { zahtijevaPrijavu: true, samKorisnik: true } },
    { path: '/admin', component: () => import('@/views/AdminView.vue'), meta: { zahtijevaPrijavu: true, zahtijevaAdmin: true } },
  ]
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.zahtijevaPrijavu && !auth.jeLogiran) return '/login'
  if (to.meta.zahtijevaAdmin && !auth.jeAdmin) return '/'
  if (to.meta.samKorisnik && auth.jeAdmin) return '/admin'
})

export default router
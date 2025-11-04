import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/dashboard.vue'),
    },
    {
      path: '/rotas',
      children: [
        { path: '', component: () => import('@/views/rotas/index.vue')},
        { path: 'add', name: 'rotas.add', component: () => import('@/views/rotas/add.vue')},
        { path: ':id/edit', component: () => import('@/views/rotas/edit.vue')},
        { path: ':id/show', component: () => import('@/views/rotas/show.vue')},
      ]
    }
  ],
})

export default router

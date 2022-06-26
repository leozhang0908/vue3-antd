import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
export const formRouting: RouteRecordRaw = {
  path: '/form',
  component: Layout,
  redirect: '/form',
  children: [{
    path: '',
    component: () => import(/* webpackChunkName: "about-page" */ '@/pages/form/form.page.vue'),
    name: 'form-page',
    meta: {
      title: 'form',
    }
  }]
}
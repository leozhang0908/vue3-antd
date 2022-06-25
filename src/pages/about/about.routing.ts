
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

export const aboutRouting: RouteRecordRaw = {
  path: '/about',
  component: Layout,
  redirect: '/about',
  children: [{
    path: '',
    component: () => import(/* webpackChunkName: "about-page" */ '@/pages/about/about.page.vue'),
    name: 'about-page',
    meta: {
      title: 'about',
    }
  }]
}
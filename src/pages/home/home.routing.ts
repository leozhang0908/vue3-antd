import { type RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue'

export const homeRouting: RouteRecordRaw = {
  path: '/home',
  component: Layout,
  redirect: '/home/home-a',
  name:'home',
  meta: {
    title: 'home',
    icon: 'home'
  },
  children: [
    {
      path: 'home-a',
      component: () => import(/* webpackChunkName: "home-a-page" */ '@/pages/home/home-a/home-a.page.vue'),
      name: 'home-a-page',
      meta: {
        title: 'home-a'
      }
    },
    {
      path: 'home-b',
      component: () => import(/* webpackChunkName: "home-b-page" */ '@/pages/home/home-b/home-b.page.vue'),
      name: 'home-b-page',
      meta: {
        title: 'home-b'
      }
    }
  ]
}
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

export const mapRouting: RouteRecordRaw = {
  path: '/map',
  component: Layout,
  redirect: '/map/',
  meta: {
    title: 'map',
    icon: 'map'
  },
  children: [
    {
      path: '',
      component: () => import(/* webpackChunkName: "map-page" */ '@/pages/map/map.page.vue'),
      name: 'map-page'
    }
  ]
}
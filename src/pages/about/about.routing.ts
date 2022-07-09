
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

export default <RouteRecordRaw>{
  path: '/about',
  component: Layout,
  redirect: '/about',
  index: 2,
  name: 'about',
  meta: {
    title: 'about',
    icon: 'about'
  },
  children: [{
    path: 'abouta',
    component: () => import(/* webpackChunkName: "about-page" */ '@/pages/about/about.page.vue'),
    name: 'about-page',
    meta: {
      title: 'about-a',
    }
  }]
}
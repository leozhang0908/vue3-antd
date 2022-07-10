import { type RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue'
export default <RouteRecordRaw>{
  path: '/users',
  component: Layout,
  redirect: '/users',
  children: [{
    path: '',
    component: () => import(/* webpackChunkName: "users-page" */ '@/pages/users/users.page.vue'),
    name: 'users-page',
    meta: {
      title: 'users',
      icon: 'users'
    }
  }]
}
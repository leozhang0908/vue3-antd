import { type RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue'
import { shallowRef } from 'vue'

export default <RouteRecordRaw>{
  path: '/users',
  component: shallowRef(Layout),
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
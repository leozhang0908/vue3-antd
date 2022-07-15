import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import { shallowRef } from 'vue'
export default <RouteRecordRaw>{
  path: '/form',
  component: shallowRef(Layout),
  redirect: '/form',
  children: [{
    path: '',
    component: () => import(/* webpackChunkName: "form-page" */ '@/pages/form/form.page.vue'),
    name: 'form-page',
    meta: {
      title: 'form',
      icon: 'form'
    }
  }]
}
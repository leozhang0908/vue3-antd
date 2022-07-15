// Created by Leo Zhang on 2022-06-27
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import { shallowRef } from 'vue'
export default <RouteRecordRaw>{
  path: '/account',
  component: shallowRef(Layout),
  redirect: '/account',
  meta: { hidden: true },
  index: 3,
  children: [{
    path: '',
    component: () => import(/* webpackChunkName: "account-page" */ '@/pages/account/account.page.vue'),
    name: 'account-page',
    meta: {
      title: 'account',

    }
  }]
}
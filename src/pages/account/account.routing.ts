// Created by Leo Zhang on 2022-06-27
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

export const accountRouting: RouteRecordRaw = {
  path: '/account',
  component: Layout,
  redirect: '/account',
  meta: { hidden: true },
  children: [{
    path: '',
    component: () => import(/* webpackChunkName: "account-page" */ '@/pages/account/account.page.vue'),
    name: 'account-page',
    meta: {
      title: 'account'
    }
  }]
}
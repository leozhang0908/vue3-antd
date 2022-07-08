import { defineStore } from 'pinia';
import { store } from '@/store';
import { RouteRecordRaw } from 'vue-router';
import router, { asyncRoutes, constantRoutes } from '@/router'
import { resolve } from '@/utils/path';

interface Permission {
  /** 需要缓存的路由组件名称列表 */
  routes: RouteRecordRaw[];
  menus: RouteRecordRaw[];
  dynamicRoutes: RouteRecordRaw[];
}
const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => (<any>route.meta.roles).includes(role))
  } else {
    return true
  }
}

export const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const res: RouteRecordRaw[] = []
  routes.forEach(route => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}
export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): Permission => ({
    routes: [],
    dynamicRoutes: [],
    menus: [],
  }),
  actions: {
    generateRoutes(roles: string[]) {
      let accessedRoutes = []
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      this.addRoutes(accessedRoutes);
      this.menus = this.getMenus();
      console.log(this.menus)
    },
    addRoutes(routes: RouteRecordRaw[]) {
      this.dynamicRoutes = routes;
      this.dynamicRoutes.forEach(route => {
        router.addRoute(route)
      })
      this.routes = constantRoutes.concat(routes)
    },

    getMenus() {
      let map = (item: RouteRecordRaw, parent?: RouteRecordRaw) => {
        if (parent) {
          item.path = resolve(parent.path, item.path);
        }
        if (item.children?.filter(s => !s.meta?.hidden).length < 2) {
          item = <RouteRecordRaw>{ ...item, ...item.children[0], path: resolve(item.path, item.children[0].path), children: [] }
        }
        if (item.meta && item?.name) {
          item.meta.namePath = (parent?.meta?.namePath || []).concat([<string>item.name])
          item.meta.fullpath = item.meta.fullpath || item.path;
        }
        if (item.children?.length) {
          item.children = <any>item.children.filter(a => !a.meta?.hidden).map(b => map(b, item))
        }
        return item;
      }
      return this.routes.filter(v => !v.meta?.hidden && v.children?.length).map(x => map(x));
    }
  },
});

// 在组件setup函数外使用
export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}

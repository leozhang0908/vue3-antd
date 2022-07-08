import { createRouter, createWebHashHistory } from "vue-router"
import Layout from '@/layout/index.vue'
import type { RouteRecordRaw } from 'vue-router'
import { homeRouting } from "@/pages/home/home.routing"
import { aboutRouting } from "@/pages/about/about.routing"
import { formRouting } from "@/pages/form/form.routing"
import { accountRouting } from "@/pages/account/account.routing"
export let constantRoutes: RouteRecordRaw[] = [
  homeRouting,
  aboutRouting,
  formRouting,
  accountRouting,
  {
    path: '/',
    component: Layout,
    redirect: '/home'
  }
]

const requireRoutes = require.context('@/pages', true, /\.routing.ts$/)

requireRoutes.keys().forEach(fileName => {
  console.log(fileName)
  let moduleValue = requireRoutes(fileName);
  constantRoutes.push(moduleValue.default || moduleValue)
})
console.log(constantRoutes)
// const modules = requireRoutes.keys().reduce((genModule, modulePath) => {
//   // 方式一：自己写正则来获取文件名，但是如果存在嵌套文件，最后生成的moduleName为：x/x/x,不太好看
//   let moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//   // 方式二：使用path模块来获取文件名，必须指定下边2个参数
//   // let moduleName = path.basename(modulePath, '.js')
//   let moduleValue = requireRoutes(modulePath) // 返回模块的内容
//   // 这里要注意：取出来的模块内容是在一个对象里，下边我们通过default来取模块，是因为
//   // module文件夹下的所有模块的导出方式是：export default默认导出，***这块也必须统一***
//   // 如果exports导出，最后不会获取到对应的模块！！！因为exports导出需要使用指定的名称获取模块
//   genModule[moduleName] = moduleValue.default || {}
//   return genModule
// }, {})

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
*/
export const asyncRoutes: RouteRecordRaw[] = [
]

const router = createRouter({
  // process.env.BASE_URL
  history: createWebHashHistory(''),
  scrollBehavior: (to: any, from: any, savedPosition: any) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: constantRoutes,
});


// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { path } = route;
    // if (path && !constantRoutes.some((n) => n === path)) {
    //   router.hasRoute(path) && router.removeRoute(path);
    // }
  });
}

export default router

import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useUserStore } from '@/store/modules/user.store'
import { usePermissionStore } from '@/store/modules/permission.store'
import { RouteLocationNormalized } from 'vue-router'
import { APP_NAME } from './class/constants'
import { getQueryString } from './utils/queryString'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(async (to: RouteLocationNormalized, _: RouteLocationNormalized, next: any) => {
  // Start progress bar
  NProgress.start()
  if (whiteList.indexOf(to.path) !== -1) {
    // In the free login whitelist, go directly
    next()
    return NProgress.done()
  }

  let code = getQueryString('code')
  if (code) {
    history.replaceState(null, null, '/' + (<any>to).href)
  }

  const user = useUserStore()

  if (!user.userInfo.name) {
    await user.getTokenWithUserInfo(code);
    const permission = usePermissionStore()
    // Generate accessible routes map based on role
    permission.generateRoutes(user.getRoles)
    next({ ...to, replace: true })
  } else {
    next()
  }
})

router.afterEach((to: RouteLocationNormalized) => {
  // Finish progress bar
  NProgress.done();
  // set page title
  (<any>document.title) = to.meta.title || APP_NAME
})

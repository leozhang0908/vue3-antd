import axios from 'axios'
import { useUserStore } from '@/store/modules/user.store'
import { message } from 'ant-design-vue'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000
  // withCredentials: true // send cookies when cross-domain requests
})

const exNull = (obj?: any) => {
  if (!obj) return {}
  const nobj: any = {}
  const keys = Object.keys(obj)
  keys.forEach(key => {
    let val = typeof (obj[key]) == 'string' ? obj[key].trim() : obj[key];
    if ([undefined, null, ''].indexOf(val) == -1 && !key.startsWith('_')) {
      nobj[key] = obj[key]
    }
  })
  return nobj
}

// Request interceptors
service.interceptors.request.use(
  (config: any) => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    config.headers['appId'] = process.env.VUE_APP_ID;//process.env.APP_ID
    // Add Authorization header to every request, you can add other custom headers here
    const userStore = useUserStore();
    if (userStore.getToken) {
      config.headers['X-Access-Token'] = userStore.getToken
    }
    if (config.data) {
      config.data = exNull(config.data)
    }
    if (config.params) {
      config.params = exNull(config.params)
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)
// Response interceptors
service.interceptors.response.use(
  (response) => {
    const { code, data, successful } = response.data;
    if (code == 200 || code == 'OK' || successful === true) {
      return data
    }else{
      return Promise.reject(response.data)
    }
  },
  (error) => {
    message.error(error?.response?.data?.message || error.message)
    if (error?.response?.status == 401) {
      // location.reload()
      if (!location.search.includes('code')) {
        useUserStore().resetToken();
        location.replace(error?.response?.data)
      }
    }
    console.error(error)
    return Promise.reject(error)
  }
)

export default service

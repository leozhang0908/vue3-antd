import { defineStore } from 'pinia';
import { store } from '@/store';
import { Storage } from '@/utils/Storage';
import { resetRouter } from '@/router';
import { UsersService } from '@/services/users';

interface IUserInfo {
  email: string;
  gender: string;
  name: string;
  nickname: string;
  phone: string;
  picture: string;
  username: string;
}

interface UserState {
  token: string;
  menus: any[];
  userInfo: IUserInfo;
  roles: string[];
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: Storage.get('ACCESS_TOKEN_KEY', 'ACCESS_TOKEN_KEY'),
    menus: [],
    userInfo: <IUserInfo>{},
    roles: []
  }),
  getters: {
    getToken(): string {
      return this.token;
    },

    getUserInfo(): IUserInfo {
      return this.userInfo;
    },
    getRoles(): string[] {
      return this.roles
    }
  },
  actions: {
    async getTokenWithUserInfo(code?) {
      let token = code ? (await UsersService.getAsyncToken(code).catch(ex => ex) || 'token') : this.getToken;
      this.setToken(token);
      return UsersService.userInfo(token).then(res => {
        this.userInfo = res;
        console.log(res)
        this.roles.push('admin');
      }).catch(ex => ex)
    },


    /** 清空token及用户信息 */
    resetToken() {
      this.menus = [];
      this.roles = [];
      this.userInfo = <IUserInfo>{};
      Storage.clear();
    },

    /** 登录成功保存token */
    setToken(token: string) {
      this.token = token ?? '';
      Storage.set('ACCESS_TOKEN_KEY', this.token);
    },

    /** 登出 */
    async logout() {
      this.resetToken();
      resetRouter();
    },
  },
});

// 在组件setup函数外使用
export function useUserStoreWithOut() {
  return useUserStore(store);
}

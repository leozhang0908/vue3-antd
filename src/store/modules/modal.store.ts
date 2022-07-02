import { defineStore } from 'pinia';
import { store } from '@/store';

export const useModalStore = defineStore({
  id: 'modal',
  state: () => ({
    modals: []
  }),
  actions: {
    add(modal) {
      this.modals.push(modal)
    },
    remove(id) {
      let index = this.modals.findIndex(v => v.id == id)
      if (index > -1) {
        this.modals.splice(index, 1);
      }
    }
  },
});

// 在组件setup函数外使用
export function useModalStoreWithOut() {
  return useModalStore(store);
}

<template>
  <a-popover :visible="visible" placement="topRight" color="rgba(0,0,0,.9)">
    <template #content>
      <a-row :gutter="[16, 16]" align="middle">
        <a-col :span="6" v-for="item in appsData" @click="open(item)">
          <div class="gutter-box">
            <ant-icon :name="item.icon" v-if='item?.icon'></ant-icon>
            <!-- <component :is="item.icon" :style="{ 'font-size': '24px' }" v-if='item?.icon' /> -->
            <div class="title">{{ item?.name }}</div>
          </div>
        </a-col>
      </a-row>
    </template>
    <div class="logo" @click="visible = true">
      <img src="@/assets/imgs/logo.png" alt="" />
      <!-- <h1 v-show="!collapsed" class="title">EC</h1> -->
    </div>
  </a-popover>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useIonModal } from '@/plugins/ion-modal';
import { useModalStore } from '@/store/modules/modal.store';
let modalStore = useModalStore()

defineProps({
  collapsed: {
    type: Boolean,
  }
});
let visible = ref(false)
const appsData = ref([]);

let $modal = useIonModal();
const open = async (item) => {
  visible.value = false;
  if (item.component) {
    return (await $modal.create(item.component, {}, { title: item.name, icon: item.icon })).present()
  }
  if (item.url) {
    let newWin = window.open('', item.target || item.name, 'height=480,width=520,toolbar =no, menubar=no, scrollbars=no, resizeable=no, location=no, status=no,left=300,top=200')
    newWin.document.write(`<body scroll="no" style="margin: 0px;padding: 0px;border:0px;overflow:hidden;"><iframe style="margin: 0px;padding: 0px;border: 0px;width:100%;height:100%" src="${item.url}"></iframe></body>`);
    modalStore.add({
      id: item.target || item.name,
      focusin: () => newWin.focus(), title: item.name,
      dismiss: () => newWin.close(),

    })
    newWin.onbeforeunload = () => {
      modalStore.remove(item.target || item.name);
    }
  }
}
onMounted(() => {
  fetch('/apps.json').then(async res => appsData.value = await res.json())
})
</script>

<style lang="less" scoped>
.logo {
  display: flex;
  overflow: hidden;
  align-items: center;
  white-space: nowrap;
  height: @layout-header-height;
  // padding-left: 24px;
  line-height: @layout-header-height;

  img {
    height: 26px;
    margin-right: 8px;
  }

  h1 {
    display: inline-block;
    margin: 0 0 0 12px;
    font-size: 16px;
    vertical-align: top;
    color: @layout-header-color;
  }
}

.ant-row {
  text-align: center;
  width: 400px;
  padding: 16px;

  .gutter-box {
    transition: .2s;
    background: rgb(208 232 255 / 40%);
    padding: 16px 10px;
    color: #fff;

    .title {
      margin-top: 5px;
    }

    &:hover {
      opacity: .6;
    }

    .anticon {
      font-size: 26px;
    }

  }
}
</style>

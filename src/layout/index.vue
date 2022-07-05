<template>
  <Layout class="layout" theme="light">
    <Layout.Sider v-model:collapsed="collapsed" :width="asiderWidth" :trigger="null" collapsible class="layout-sider">
      <Logo :collapsed="collapsed" />
      <AsideMenu :collapsed="collapsed" />
    </Layout.Sider>
    <Layout>
      <PageHeader v-model:collapsed="collapsed"></PageHeader>
      <Layout.Content class="layout-content">
        <div class="layout-content-wide">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </div>
      </Layout.Content>
    </Layout>
  </Layout>
</template>

<script lang="ts" setup>
import { Layout } from "ant-design-vue";
import Logo from "./logo/index.vue";
import AsideMenu from "./menu/menu.vue";
import PageHeader from "./header/index.vue";
import { ref, computed } from "vue";
const collapsed = ref<boolean>(false);
// 自定义侧边栏菜单收缩和展开时的宽度
const asiderWidth = computed(() => (collapsed.value ? 80 : 220));
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  min-height: 100%;
  width: 100%;

  .ant-layout {
    overflow: hidden;
  }

  .layout-content {
    flex: none;
    position: relative;
    margin: @margin-lg;
    margin-top: @layout-header-height + @margin-lg;
  }

  .layout-content-wide {
    max-width: @screen-xl;
    margin: 0 auto;
  }

  .ion-page {
    padding: 24px;
    background: #fff;
  }
}
</style>

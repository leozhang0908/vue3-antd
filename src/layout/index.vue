<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Layout class="layout" theme="light">
    <div
      :style="{
        width: `${asiderWidth}px`,
        flex: `0 0 ${asiderWidth}px`,
        'max-width': `${asiderWidth}px`,
        'min-width': `${asiderWidth}px`,
      }"
      class="sider-background"
    ></div>
    <Layout.Sider
      collapsedWidth="56"
      v-model:collapsed="collapsed"
      :width="asiderWidth"
      :trigger="null"
      collapsible
      class="layout-sider"
    >
      <Logo :collapsed="collapsed" />
      <AsideMenu :collapsed="collapsed" />
      <a-button
        size="large"
        type="text"
        class="menu-fold"
        @click="() => (collapsed = !collapsed)"
      >
        <component :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
      </a-button>
    </Layout.Sider>
    <Layout>
      <PageHeader :style="{ width: `calc(100% - ${asiderWidth}px)` }" />
      <Layout.Header />
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
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
import { ref, computed } from "vue";
const collapsed = ref<boolean>(false);
// 自定义侧边栏菜单收缩和展开时的宽度
const asiderWidth = computed(() => (collapsed.value ? 56 : 208));
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  min-height: 100%;
  width: 100%;

  .ant-layout {
    overflow: hidden;
  }

  .sider-background {
    width: 208px;
    overflow: hidden;
    flex: 0 0 208px;
    max-width: 208px;
    min-width: 208px;
    transition: background-color 0.3s ease 0s, min-width 0.3s ease 0s,
      max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
  }

  .layout-sider {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
    // box-shadow: 2px 0 8px 0 rgba(29, 35, 41, .05);

    &:deep(.ant-layout-sider-children) {
      display: flex;
      flex-direction: column;
      height: 100%;

      .menu-container {
        flex: 1 1 0%;
        overflow: hidden auto;
      }
    }
  }

  .ion-page {
    padding: 24px;
    position: relative;

    &:not([fullscreen]) {
      background: #fff;
      margin: 24px;
    }
  }

  .menu-fold {
    text-align: left;
    padding-left: 20px;
  }
}
</style>

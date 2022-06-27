<template>
  <!-- 目录 -->
  <template v-if="props.routeItem.children?.length">
    <Menu.SubMenu :key="props.routeItem.name" v-bind="$attrs">
      <template #icon>
        <windows-outlined />
      </template>
      <template #title>
        {{ props.routeItem }}{{ props.routeItem.meta?.title }}
      </template>
      <template v-for="item in props.routeItem.children" :key="item.path || item.fullPath">
        <!-- 递归生成菜单 -->
        <MyMenuItem :route-item="item" />
      </template>
    </Menu.SubMenu>
  </template>
  <!-- 菜单 -->
  <template v-else>
    <Menu.Item :key="props.routeItem.name">
      <template #icon>
        <windows-outlined />
      </template>
      <span>{{ props.routeItem.meta?.title }}</span>
    </Menu.Item>
  </template>
</template>
<script lang="ts">
export default {
  name: "MyMenuItem",
};
</script>
<script setup lang="ts">
import { type PropType } from 'vue';
import { Menu } from 'ant-design-vue';
import type { RouteRecordRaw } from 'vue-router';
import { WindowsOutlined } from '@ant-design/icons-vue';

const props = defineProps({
  routeItem: {
    type: Object as PropType<RouteRecordRaw>,
  },
});


</script>
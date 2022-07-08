<template>
  <svg v-bind="$attrs" class="ion-icon" :style="getStyle" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>
<script lang="ts" setup>
import { computed, type CSSProperties } from 'vue';
const importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().forEach(requireContext);
try {
  importAll(require.context('@/assets/icons', true, /\.svg$/));
} catch (error) {
  console.log(error);
}

defineOptions({
  name: 'ion-icon'
});

const props = defineProps({
  prefix: {
    type: String,
    default: 'ion-icon',
  },
  name: {
    type: String,
    required: true,
  },
  size: {
    type: [Number, String],
    default: '1em',
  },
});
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
const getStyle = computed((): CSSProperties => {
  const { size } = props;
  const s = Number(size) ? `${size}px` : size;
  return {
    width: s,
    height: s,
  };
});
</script>

<style lang="less">
.ion-icon {
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}
</style>

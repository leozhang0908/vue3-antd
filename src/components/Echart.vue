<template>
  <div
    class="echart"
    ref="echartRef"
    :style="{ width: width, height: height }"
  ></div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watchPostEffect } from "vue";
import * as echarts from "echarts";

export default defineComponent({
  props: {
    options: { type: Object as PropType<echarts.EChartsOption>, require: true },
    height: { type: String, require: true },
    width: { type: String },
  },
  setup(props: { options }, { emit }) {
    let chart: echarts.ECharts = null;
    let echartRef = ref<HTMLElement | null>(null);
    watchPostEffect(() => {
      if (echartRef.value && !chart) {
        chart = echarts.init(echartRef.value);
        chart.on("click", (params) => emit("onClick", params));
      }
      props.options && chart && chart.setOption(props.options);
    });
    return {
      echartRef
    };
  },
});
</script>
<style lang="less" scoped>
.echart {
  min-height: 150px;
  width: 100%;
}
</style>

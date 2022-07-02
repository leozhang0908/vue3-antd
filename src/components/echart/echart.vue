<template>
  <div class="echart" ref="echartRef" :style="{ width: width, height: height }"></div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watchPostEffect } from "vue";
import * as echarts from "echarts";
import * as echartsTypes from "./types";

export default defineComponent({
  props: {
    options: { type: Object as PropType<echarts.EChartsOption>, require: true },
    height: { type: String, require: true },
    width: { type: String },
    type: { type: String }
  },
  setup(props: { options, type }, { emit }) {
    let chart: echarts.ECharts = <any>null;
    let echartRef = ref<HTMLElement | null>(null);
    watchPostEffect(() => {
      if (echartRef.value && !chart) {
        chart = echarts.init(echartRef.value);
        chart.on("click", (params) => emit("onClick", params));
      }
      props.options && chart && chart.setOption(props.type && echartsTypes[props.type] ? echartsTypes[props.type](props.options) : props.options);
    })
    return {
      echartRef
    }
  },
});
</script>
<style lang="less" scoped>
.echart {
  min-height: 150px;
  width: 100%;
}
</style>

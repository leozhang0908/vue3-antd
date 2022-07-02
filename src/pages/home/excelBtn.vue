<template>
  <div id="excelBtn">
    <!-- <div @click="open" class="openbtn">打开表格</div> -->
    <a-button type="primary" @click="open">
      <div class="tb-rl">
        打开表格
      </div>
    </a-button>
    <a-drawer v-model:visible="data.visible" title="测试表格" :destroyOnClose="true" :width="'60%'" placement="right">
      <template #extra>
        <a-button type="primary" @click="exportData">导出数据</a-button>
      </template>
      <luckysheet ref="luckysheet"></luckysheet>
    </a-drawer>
  </div>
</template>
<script lang="ts" setup>
import Luckysheet from '@/components/luckysheet/Luckysheet.vue';
import { reactive, ref } from 'vue'
const data = reactive({
  visible: false
})
const luckysheet = ref()
function open() {
  data.visible = true
}
const exportData = () => {
  console.log(JSON.stringify(luckysheet.value.getSheetData()))
}
</script>
<style lang="less">
#excelBtn {
  >button {
    position: fixed;
    right: 0;
    top: 46%;
    padding: 6px;
    height: 90px;
    border-radius: 4px 0px 0px 4px;
  }

  .tb-rl {
    writing-mode: tb-rl;
  }
}
</style>
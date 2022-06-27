<template>
  <div id="excelBtn">
    <!-- <div @click="open" class="openbtn">打开表格</div> -->
    <a-button type="primary" @click="open">
      <div class="tb-rl">
        打开表格
      </div>
    </a-button>
    <a-drawer v-model:visible="data.visible" title="测试表格" :destroyOnClose="true" :width="'60%'" placement="right">
      <luckysheet></luckysheet>
    </a-drawer>
  </div>
</template>
<script lang="ts" setup>
import Luckysheet from './luckysheet/Luckysheet.vue';
import { reactive } from 'vue'
const data = reactive({
  visible: false
})
function open() {
  data.visible = true
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
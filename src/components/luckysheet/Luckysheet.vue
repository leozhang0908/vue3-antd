<template>
  <div class="luckysheet-container" id="luckysheet"></div>
</template>
<script lang="ts" setup>
import { nextTick, onMounted, defineProps, ref, watchPostEffect, PropType } from 'vue';
import { LuckyCell, Luckysheet } from './luckysheet';
const sheet = <Luckysheet>window['luckysheet'];
let inited = ref(false);
const props = defineProps({
  options: {
    type: Object,
  },
  data: {
    type: Object as PropType<LuckyCell | LuckyCell[]>,
  }
});
const emit = defineEmits(['onChange']);
function setData(row: LuckyCell | LuckyCell[]) {
  if (Array.isArray(row)) {
    row.filter(v => setData(v))
  } else {
    sheet.setCellValue(row.r, row.c, row.v)
  }
}

watchPostEffect(() => {
  props.data && inited && setData(props.data);
});

onMounted(() => nextTick(() => {
  sheet.create({
    container: 'luckysheet',
    lang: 'zh',
    showinfobar: false,
    showtoolbar: false,
    showsheetbar: false,
    showstatisticBar: false,
    sheetFormulaBar: false,
    enableAddBackTop: false,
    enableAddRow: false,
  })
  inited.value = true
}))

defineExpose({
  setData,
  getSheetData: () => sheet.getAllSheets()[0].celldata,
  getSheet: () => sheet.getSheet(),
})
</script>
<style lang="less">
.luckysheet-container {
  height: 100%;
  position: relative;
  margin: 0px;
  padding: 0px;
  height: 100%;
  left: 0px;
  top: 0px;
}

// .vue-luckysheet {
.luckysheet-paneswrapper {
  .luckysheet-rows-h {
    background-color: transparent;
  }

  .luckysheet-cell-main {
    background-color: transparent;
  }

  .luckysheet-cols-h-c {
    background-color: transparent;
  }
}

// }

div[dir='ltr'] {
  .luckysheet-input-box {
    z-index: 10000;
  }
}
</style>
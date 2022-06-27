<template>
  <div>
    <a-input v-if="props.type === 'input'" @click="openFile" readonly :value="fileName" :placeholder="props.placeholder" />
    <a-upload
      v-if="props.type === 'button'"
      v-model:file-list="data.fileList"
      name="file"
      action="#"
      :accept="accept"
      :showUploadList="false"
      :multiple="false"
      :beforeUpload="beforeUpload"
      :headers="props.headers">
      <a-button ref="uploadBtnRef">
        <upload-outlined></upload-outlined>
        点击上传
      </a-button>
    </a-upload>
    <a-upload-dragger
      v-if="props.type === 'card'"
      v-model:file-list="data.fileList"
      name="file"
      action="#"
      :accept="accept"
      :showUploadList="false"
      :multiple="false"
      :beforeUpload="beforeUpload"
    >
      <p class="ant-upload-drag-icon">
        <inbox-outlined></inbox-outlined>
      </p>
      <p class="ant-upload-text">点击或拖入文件上传</p>
      <p class="ant-upload-hint">{{props.remarks}}</p>
    </a-upload-dragger>
  </div>
</template>
<script lang="ts" setup>
import { reactive, computed, ref } from 'vue'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons-vue'
const props = defineProps({
  headers: Object,
  accept: String, // 上传类型
  success: {type: Function, default: (data: any) => {console.log('执行成功回调', data)}},
  error: {type: Function, default: (data: any) => {console.log('执行失败回调', data)}},
  upload: {type: Function, default: (data: any) => {console.log('执行文件回调', data)}},
  type: { type: String, default: 'button' },  // 样式类型 button input card
  remarks: { type: String, default: '上传备注' },
  placeholder: { type: String, default: '请选择' }
})
const uploadBtnRef = ref({})
const data = reactive({
  fileList: [],
  file: {},
})
const fileName = computed(() => {
  if ((<any>data.file).name) {
    return (<any>data.file).name
  }
  return ''
})
function beforeUpload(file: any, fileList: any[]) {
  // 网络请求，成功回调和失败回调
  // 或者直接返回已选中文件
  props.upload(file)
  data.file = file
  // props.success(file)
  return false
}
function openFile() {
  (<any>uploadBtnRef.value).$el.click()
  console.log(uploadBtnRef)
}
function inputChange(e) {
  console.log(e)
}
</script>
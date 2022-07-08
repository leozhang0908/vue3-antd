<template>
    <!--ion-modal-footer-->
    <input type="hidden" aria-hidden="true" name="ion-modal-footer" />
    <teleport to=".ant-modal .ant-modal-footer" v-if="enable">
        <slot></slot>
    </teleport>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'ion-modal-footer',
    data() {
        return { enable: false }
    },
    mounted() {
        this.enable = true
    }
})
</script>
<style lang="less" scoped>
</style>
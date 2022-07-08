<template>
    <input type="hidden" aria-hidden="true" name="ion-modal-header" />
    <teleport to=".ant-modal .ant-modal-header" v-if="enable">
        <slot></slot>
    </teleport>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'ion-modal-header',
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
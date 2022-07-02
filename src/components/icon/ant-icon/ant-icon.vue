<template>
    <Icon :icon="name" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from './icon'
export default defineComponent({
    props: {
        name: String
    },
    components: {
        Icon
    }
})
</script>
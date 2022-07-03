<template>
    <teleport to="#app>.layout">
        <div class="ion-modal-labels-box" v-if="modalStore.modals.length">
            <Tooltip placement="right" v-for="item in modalStore.modals" :key="item.id">
                <template #title>
                    <span>{{ item.title }}</span>
                </template>
                <div class="bar-button">
                    <span class="title" @click="item.focusin()">{{ item.title }}</span>
                    <Button type="text" size="small" @click="remove(item)">
                        <template #icon>
                            <CloseOutlined />
                        </template>
                    </Button>
                </div>
            </Tooltip>
        </div>
    </teleport>
</template>
<script lang="ts" setup>
import { useModalStore } from '@/store/modules/modal.store'
import { nextTick } from 'vue';
import { IonModal } from './ion-modal.type';
let modalStore = useModalStore()
const remove = (item: IonModal) => {
    item.dismiss();
    nextTick(() => modalStore.remove(item.id))
}
</script>
<style lang="less">
.ion-modal-labels-box {
    position: fixed;
    margin-top: @layout-header-height;
    left: 0;
    top: 15vh;
    width: 34px;
    // padding-top: 20px;
    text-align: center;
    background: #fff;
    // height: 100%;
    box-shadow: 0 1px 4px 0 rgb(0 21 41 / 12%);
}

.bar-button {
    writing-mode: vertical-rl;
    // padding: 12px 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: aliceblue;
    width: 100%;
    padding: 5px 0;
    border-bottom: 1px solid rgba(0, 0, 0, .1);

    .title {
        display: inline-block;
        text-align: start;
        padding: 5px;
        cursor: pointer;
        transition: .2s;
        opacity: 1;
        user-select: none;

        &:hover {
            opacity: .6;
        }
    }
}
</style>
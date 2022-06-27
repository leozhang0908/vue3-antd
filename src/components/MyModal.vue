<template>
  <a-modal :class="{ fullscreen: fullscreenModel, mini: miniModel }" class="cx-modal" ref="modalRef"
    :style="fullscreenModel ? null : transformStyle" v-model:visible="visible"
    v-bind="omit(modalProps, ['visible', 'title', 'footer', 'onCancel', 'closeIcon', 'onOk', 'closable', 'afterClose'])"
    :footer="null" :closable="false" :mask="false" :maskClosable="false" :forceRender="true"
    :wrap-style="{ overflow: 'hidden' }" :afterClose="() => afterClose()">
    <component :is='component' v-bind="componentProps" @dismiss="dismiss" @minimize="minimize"
      @fullscreen="fullscreen" />
    <template #title>
      <div ref="modalTitleRef" class="modal-title">
        <span>{{ modalProps?.title }}</span>
        <a-space @click.stop>
          <a-button type="text" @click="minimize(true)"><template #icon>
              <minus-outlined />
            </template></a-button>
          <a-button type="text" @click="fullscreen(!fullscreenModel)"><template #icon>
              <border-outlined />
            </template></a-button>
          <a-button type="text" @click="dismiss()"><template #icon>
              <close-outlined />
            </template>
          </a-button>
        </a-space>
      </div>
    </template>
    <template #modalRender="{ originVNode }">
      <div @mousedown="focusin($event)" ref="modalEl">
        <component :is="originVNode" />
      </div>
    </template>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, computed, CSSProperties, watch, watchEffect } from 'vue';
import { omit } from 'lodash-es';
import { useDraggable } from '@vueuse/core';
import { MinusOutlined, BorderOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { modalProps } from 'ant-design-vue/es/modal/Modal';
import { getStyle } from '@/utils/getStyle';
export default defineComponent({
  data() {
    return { modalEl: null, componentData: null }
  },

  components: {
    MinusOutlined,
    BorderOutlined,
    CloseOutlined
  },
  props: {
    modalProps: {
      type: modalProps,
      default: {}
    },
    componentProps: {
      type: Object,
      default: {}
    },
    component: {
      type: Object,
      requried: true
    },
    onCreated: {
      type: Function
    }
  },
  mounted() {
    this.modalEl = (<HTMLElement>this.$refs.modalEl).parentElement.parentElement.parentElement.parentElement;
    let width = parseFloat(getStyle(this.modalEl.querySelector('.ant-modal-body>*'), 'width'));
    this.modalProps.width = <any>width;
    this.visible = false;
    this.$nextTick(() => {
      this.modalProps.wrapClassName = <any>'ready';
      this.onCreated(this.modalRef);
    });

  },
  setup() {
    
    const fullscreenModel = ref<boolean>(false);
    const miniModel = ref<boolean>(false);
    const visible = ref<boolean>(true);
    const modalTitleRef = ref<HTMLElement | null>(null);
    const modalRef = ref<any | null>(null);
    const { x, y, isDragging } = useDraggable(modalTitleRef);
    const startX = ref<number>(0);
    const startY = ref<number>(0);
    const startedDrag = ref(false);
    const transformX = ref(0);
    const transformY = ref(0);
    const preTransformX = ref(0);
    const preTransformY = ref(0);
    const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 });
    watch([x, y], () => {
      if (fullscreenModel.value) return;
      if (!startedDrag.value) {
        startX.value = x.value;
        startY.value = y.value;
        const bodyRect = document.body.getBoundingClientRect();
        const titleRect = (<any>modalTitleRef).value.getBoundingClientRect();
        dragRect.value.right = bodyRect.width - titleRect.width;
        dragRect.value.bottom = bodyRect.height - titleRect.height;
        preTransformX.value = transformX.value;
        preTransformY.value = transformY.value;
      }
      startedDrag.value = true;
    });

    watch(isDragging, () => {
      if (!isDragging) {
        startedDrag.value = false;
      }
    });

    watchEffect(() => {
      if (startedDrag.value) {
        transformX.value =
          preTransformX.value +
          Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) -
          startX.value;
        transformY.value =
          preTransformY.value +
          Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) -
          startY.value;
      }
    });
    const transformStyle = computed<CSSProperties>(() => {
      return {
        transform: `translate(${transformX.value}px, ${transformY.value}px)`,
      }
    });

    return {
      visible,
      modalTitleRef,
      transformStyle,
      fullscreenModel,
      miniModel,
      modalRef,
      omit,
      afterClose: () => { }
    };
  },
  methods: {
    focusin(e: any) {
      this.$modal.zIndex += 1;
      this.modalEl.style.zIndex = this.$modal.zIndex
    },
    present() {
      this.visible = true;
    },
    dismiss(data?) {
      this.visible = false;
      this.componentData = data;
    },
    onWillDismiss() {
      return new Promise(resolve => this.dismiss = (data) => {
        this.componentData = data;
        resolve({ data })
        this.visible = false;
      })
    },
    onDismissed() {
      return new Promise(resolve => this.afterClose = () => resolve({ data: this.componentData }))
    },
    minimize(miniModel) {
      this.miniModel = miniModel
    },
    onMinimize() {
      return new Promise(resolve => this.minimize = (miniModel) => {
        resolve(miniModel)
        this.miniModel = miniModel
      })
    },
    fullscreen(fullModel) {
      this.fullscreenModel = fullModel
    },
    onFullscreen() {
      return new Promise(resolve => this.fullscreen = (fullModel) => {
        resolve(fullModel)
        this.fullscreenModel = fullModel
      })
    }
  }
});
</script>
<style lang="less">
.cx-modal {
  max-width: unset;

  &.fullscreen {
    width: 100vw !important;
    height: 100vh !important;
    top: 0;
    left: 0;
    resize: none;

    .ant-modal-header {
      cursor: auto;
    }
  }

  &.mini {
    display: none;
  }
}

.cx-modal {
  box-shadow: rgb(0 0 0 / 12%) 0px 3px 6px -4px, rgb(0 0 0 / 8%) 0px 6px 16px 0px, rgb(0 0 0 / 5%) 0px 9px 28px 8px;
  position: fixed;
  top: 15vh;
  right: 0;
  left: 0;
  border-radius: 2px;
  // resize: both;
  // overflow: auto;
  background: #fff;
  padding-bottom: 0;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, .2);
    border-radius: 20px;
  }

  &::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 20px;
  }

  &::-webkit-resizer {
    background: transparent;
  }

  .ant-modal-content {
    box-shadow: none;
    border-radius: 0;
  }

  .ant-modal-header {
    background: #cfdfed;
    border-bottom: 0px;
    padding: 0 0 0 16px;
    width: 100%;
    cursor: move;

    .ant-modal-title {
      line-height: unset;
      font-size: 14px;
    }

    .modal-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      user-select: none;

      svg {
        font-size: 12px;
        color: rgba(0, 0, 0, .65);
      }
    }
  }

  .ant-modal-body {
    padding: 16px;
  }
}
</style>
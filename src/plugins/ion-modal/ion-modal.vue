<template>
  <a-modal class="cx-modal" :style="{ transform: transformStyle }" v-model:visible="visible"
    v-bind="omit(modalProps, ['visible', 'closeIcon', 'onOk', 'onCancel', 'afterClose'])"
    :wrap-style="{ overflow: 'hidden' }" :afterClose="() => afterClose()" @cancel="dismiss()" @ok="dismiss" centered>
    <component ref='componentRef' :is='component' v-bind="componentProps" @dismiss="dismiss" />
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watchEffect, Component } from 'vue';
import type { PropType } from 'vue';
import { omit } from 'lodash-es';
import { useDraggable, watchDebounced, watchThrottled } from '@vueuse/core';
import { MinusOutlined, BorderOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { getStyle } from '@/utils/getStyle';
import { useModalStoreWithOut } from '@/store/modules/modal.store';
const modalStore = useModalStoreWithOut()
export default defineComponent({
  data() {
    return { modalEl: null, componentData: null, id: null }
  },
  components: {
    MinusOutlined,
    BorderOutlined,
    CloseOutlined
  },
  props: {
    modalProps: {
      type: Object,
      default: {}
    },
    componentProps: {
      type: Object,
      default: {}
    },
    component: {
      type: [Object, String] as PropType<Component | string>,
      requried: true
    },
    onCreated: {
      type: Function
    }
  },
  mounted() {
    let modalBody = (<any>this.componentRef).$el.parentNode
    this.modalProps.cancelText = this.modalProps.cancelText || '取消';
    this.modalProps.okText = this.modalProps.okText || '确认';
    this.modalProps.width = Math.min(parseFloat(getStyle(modalBody.querySelector('.ion-modal') || (<any>this.componentRef).$el.firstElementChild, 'width')), document.body.offsetWidth * .8)//<any>width + paddingRight + paddingLeft;
    this.id = (<any>this.modalProps).id || (modalStore.modals.length + 1);
    this.modalProps.destroyOnClose = false;

    if (modalBody.querySelector('[name="ion-modal-footer"]')) {
      this.modalProps.footer = ' ';
    } length
    if (modalBody.querySelector('[name="ion-modal-header"]')) {
      this.modalProps.title = ' ';
    }
    this.visible = false;
    this.$nextTick(() => {
      this.modalProps.wrapClassName = <any>'ready';
      this.onCreated(this);
      this.modalProps.destroyOnClose = true;
    });
  },
  setup() {
    const visible = ref<boolean>(true);

    const componentRef = ref<HTMLElement | null>(null);
    // const modalRef = ref<any | null>(null);
    const { x, y, isDragging } = useDraggable((<any>componentRef.value)?.$el.parentElement.parentElement.querySelector('.ant-modal-header'));
    const startX = ref<number>(0);
    const startY = ref<number>(0);
    const startedDrag = ref(false);
    const pos = 0;
    const transformX = ref(pos);
    const transformY = ref(pos);
    const preTransformX = ref(0);
    const preTransformY = ref(0);
    const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 });
    watchThrottled([x, y], () => {
      if (!startedDrag.value) {
        startX.value = x.value;
        startY.value = y.value;
        const bodyRect = document.body.getBoundingClientRect();
        const titleRect = (<any>(<any>componentRef.value)?.$el.parentElement.parentElement.querySelector('.ant-modal-header')).getBoundingClientRect();
        dragRect.value.right = bodyRect.width - titleRect.width;
        dragRect.value.bottom = bodyRect.height - titleRect.height;
        preTransformX.value = transformX.value;
        preTransformY.value = transformY.value;
      }
      startedDrag.value = true;
    }, { throttle: 300 });

    watchDebounced(isDragging, () => {
      if (!isDragging) {
        startedDrag.value = false;
      }
    }, { debounce: 300 });

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

    const transformStyle = computed<String>(() => {
      return `translate(${transformX.value}px, ${transformY.value}px)`
    });

    return {
      visible,
      transformStyle,
      omit,
      afterClose: () => { },
      componentRef
    };
  },
  methods: {
    _close(data?) {
      this.visible = false;
      this.componentData = data;
      modalStore.remove(this.id)
    },
    show() {
      this.visible = true;
    },
    focusin() {
      this.$modal.zIndex += 1;
      // this.modalEl.style.zIndex = this.$modal.zIndex
      this.show()
    },
    present() {
      this.focusin();
      modalStore.add(this)
    },
    dismiss(data?) {
      this._close(data)
    },
    onWillDismiss() {
      return new Promise(resolve => this.dismiss = (data) => {
        this._close(data)
        resolve({ data })
      })
    },
    onDismissed() {
      return new Promise(resolve => this.afterClose = () => resolve({ data: this.componentData }))
    }
  }
});
</script>
<style lang="less">
.cx-modal {
  .ant-modal-body {
    padding: 0;
    max-height: 70vh;
    overflow: hidden auto;

    .ion-modal {
      padding: 24px;
    }
  }

  .ant-modal-header {
    padding-bottom: 10px;
    border-bottom: none;
  }

  .ant-modal-footer {
    background: #f5f7fa;
    border-top: 0;
    // text-align: center;
  }
}
</style>
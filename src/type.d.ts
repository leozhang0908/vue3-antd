import { ComponentCustomProperties } from 'vue'
import { ModalProps } from 'ant-design-vue'

export interface IonModal {
  present: () => void
  dismiss: () => void
  onWillDismiss: () => Promise<any>
  onDismissed: () => Promise<any>
  minimize: (mode: boolean) => Promise<boolean>
  onMinimize: () => Promise<boolean>
  fullscreen: (mode: boolean) => Promise<boolean>
  onFullscreen: () => Promise<boolean>
  zIndex: number
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $modal: { create(component: Component, componentProps?: {}, modalProps?: ModalProps): Promise<IonModal>, zIndex: number }
  }
}


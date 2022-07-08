import { ComponentCustomProperties } from 'vue'
import { ModalProps } from 'ant-design-vue'

export interface IonModal {
  present: () => void
  dismiss: () => void
  onWillDismiss: () => Promise<any>
  onDismissed: () => Promise<any>
  id: any;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $modal: {
      create(component: Component | string, componentProps?: {}, modalProps?: ModalProps & { id?}): Promise<IonModal>,
      dismiss(id?: string): boolean,
      getTop(): IonModal
    }
  }
}
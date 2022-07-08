
import { App, inject, Plugin, } from "vue";
import { IonModalController } from "./ion-modal.ctrl";
import IonModalFooter from './ion-modal-footer.vue'
import IonModalHeader from './ion-modal-header.vue'
const IonModalSymbol = Symbol()

export function useIonModal(): IonModalController {

    const ionModal = inject<IonModalController>(IonModalSymbol)
    if (!ionModal) {
        throw new Error('No IonModal provided!')
    }
    return ionModal;
}

const plugin: Plugin = {
    install(app: App) {
        const ionModal = new IonModalController(app)
        app.config.globalProperties.$modal = ionModal;
        app.provide(IonModalSymbol, ionModal);
        app.component('IonModalFooter', IonModalFooter);
        app.component('IonModalHeader', IonModalHeader)
    }
}
export default plugin;
import { App, inject, Plugin, } from "vue";
import { IonModalController } from "./ion-modal.ctrl";
import IonModalToolbarCom from './ion-modal.toolbar.vue';
const IonModalSymbol = Symbol()

export function useIonModal(): IonModalController {

    const ionModal = inject<IonModalController>(IonModalSymbol)
    if (!ionModal) {
        throw new Error('No DzModal provided!')
    }
    return ionModal;
}

const plugin: Plugin = {
    install(app: App) {
        const ionModal = new IonModalController(app)
        app.config.globalProperties.$modal = ionModal;
        app.provide(IonModalSymbol, ionModal);
        app.component('IonModalToolbar', IonModalToolbarCom)
    }
}
export default plugin;
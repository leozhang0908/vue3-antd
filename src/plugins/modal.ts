import MyModal from '../components/MyModal.vue';
import { App, inject, Plugin, h, render, Component, getCurrentInstance } from 'vue'
import { IonModal } from '@/type';

export const IonModalSymbol = Symbol()

export class IonModalController {
    private _$containers: HTMLDivElement
    private _app?: App = undefined
    public zIndex = 1;
    constructor(app: App) {
        this._app = app;
        this._$containers = document.createElement("div");
        this._$containers.classList.add('ion-modals')
        document.body.appendChild(this._$containers);
    }
    public create(component: Component, componentProps: {}, modalProps?: any): Promise<IonModal> {
        return new Promise((reslove, reject) => {
            if (!this._app) {
                reject('_app is undefined')
                return;
            }
            let modalOpts = {
                getContainer: this._$containers,
                ...modalProps,
            }

            const vnode = h(MyModal, {
                modalProps: modalOpts,
                componentProps,
                component,
                onCreated: () => reslove((<any>vnode.component)!.ctx)
            })

            // 关联app上下文
            vnode.appContext = this._app._context || getCurrentInstance()?.appContext
            render(vnode, document.createElement("div"));
        });
    }
}


export function useDzModal(): IonModalController {

    const dzModal = inject<IonModalController>(IonModalSymbol)
    if (!dzModal) {
        throw new Error('No DzModal provided!')
    }
    return dzModal;
}

const plugin: Plugin = {
    install(app: App) {
        const dzModal = new IonModalController(app)
        app.config.globalProperties.$modal = dzModal;
        app.provide(IonModalSymbol, dzModal);
    }
}
export default plugin;

import IonModalCom from './ion-modal.vue';
import { App, h, render, Component, getCurrentInstance } from 'vue'
import { IonModal } from './typing';
import { ModalProps } from 'ant-design-vue';

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
    public create(component: Component | string, componentProps: {}, modalProps?: ModalProps & { id?, icon?}): Promise<IonModal> {
        return new Promise((reslove, reject) => {
            if (!this._app) {
                reject('_app is undefined')
                return;
            }
            let modalOpts = {
                getContainer: this._$containers,
                ...modalProps,
            }

            const vnode = h(IonModalCom, {
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
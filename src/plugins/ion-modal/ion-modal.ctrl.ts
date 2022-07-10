import IonModalCom from './ion-modal.vue';
import { App, h, render, Component, getCurrentInstance } from 'vue'
import { IonModal } from './typing';
import { ModalProps } from 'ant-design-vue';

export class IonModalController {
    protected modals: IonModal[] = [];
    private _$containers: HTMLDivElement
    private _app?: App = undefined
    public zIndex = 1;
    constructor(app: App) {
        this._app = app;
        this._$containers = document.createElement("div");
        this._$containers.classList.add('ion-modals')
        document.body.appendChild(this._$containers);
    }
    public create(component: Component | string, componentProps, modalProps?: ModalProps & { id?, icon?}): Promise<IonModal> {
        return new Promise((reslove, reject) => {
            if (!this._app) {
                reject('_app is undefined')
                return;
            }
            let modalOpts = {
                getContainer: this._$containers,
                ...modalProps,
                id: modalProps.id || this.modals.length + 1
            }

            const vnode = h(IonModalCom, {
                modalProps: modalOpts,
                componentProps,
                component,
                onCreated: (modal) => {
                    this.modals.push(modal);
                    reslove((<any>vnode.component)!.ctx)
                }
            })

            // 关联app上下文
            vnode.appContext = this._app._context || getCurrentInstance()?.appContext
            render(vnode, document.createElement("div"));
        });
    }
    dismiss(id?): boolean {
        let modal = id === undefined || id === null ? this.getTop() : this.modals.find(v => v.id == id);
        modal && modal.dismiss()
        this.remove(id);
        return !!modal
    }
    private remove(id?) {
        let index = id === undefined || id === null ? this.modals.length - 1 : this.modals.findIndex(v => v.id == id);
        if (index >= 0) {
            this.modals.splice(index, 1)
        }
    }
    getTop(): IonModal {
        return this.modals.length > 0 ? this.modals[this.modals.length - 1] : null
    }
}
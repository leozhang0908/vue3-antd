import { createApp } from 'vue'
import App from './App.vue'
import { IonModal, setupAntd } from './plugins'
import router from './router'
import './permission'
import { setupStore } from './store'
import { setupDirectives } from './directives'
import * as modals from '@/modals'
import * as components from '@/components'
const app = createApp(App)

setupAntd(app)
setupStore(app)
setupDirectives(app)

//register global modals
Object.keys(modals).forEach(key => {
    app.component(key, modals[key])
})

//register global components
Object.keys(components).forEach(key => {
    app.component(key, components[key])
})

app.use(router)
    .use(IonModal)
    .mount('#app')
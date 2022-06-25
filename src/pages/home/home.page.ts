import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
@Options({
    components: {
        HelloWorld,
    }
})

export default class HomePage extends Vue {
    mounted() {
        console.log('mounted')
    }

    async show() {
        let modal = await this.$modal.create(HelloWorld, {}, { title: 'adfsvdc' })
        modal.present()

        modal.onDismissed().then(res => {
            console.log('onDismissed', res)
        })
        modal.onWillDismiss().then(res => {
            console.log('onWillDismiss', res)
        })
        console.log(modal)

    }
}
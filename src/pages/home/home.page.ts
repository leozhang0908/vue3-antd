import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import Echart from '@/components/Echart.vue'
import { scatterOption } from '@/class/mock'
import { TablesModal } from '@/modals';
import excelBtn from '@/components/excelBtn.vue'
@Options({
    components: {
        Echart,
        excelBtn
    }
})

export default class HomePage extends Vue {
    chartOpts = scatterOption;
    mounted() {
        console.log('mounted')
    }

    async openHw() {
        (await this.$modal.create(HelloWorld, {}, { title: 'adfsvdc' })).present()
    }
    async onDotClick(item) {
        console.log(item)
        let modal = await this.$modal.create(TablesModal, { point: item.data }, { title: 'adfsvdc' })
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
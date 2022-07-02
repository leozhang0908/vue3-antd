import { Options, Vue } from 'vue-class-component'
import { heatmap, scatterOption } from '@/class/mock'
import excelBtn from './excelBtn.vue'
import { UsersService } from '@/services/users';
import { Echart } from '@/components/echart';
@Options({
    components: {
        Echart,
        excelBtn,
    }
})

export default class HomePage extends Vue {
    lineOpt = { category: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], data: [820, 932, 901, 934, 1290, 1330, 1320] }
    chartOpts = scatterOption;
    heatmapOpts = heatmap()
    mounted() {
        console.log('mounted', this.$route.query)
        // UsersService.userInfo()
    }

    async openHw() {
        (await this.$modal.create('HelloModal', {}, { title: 'adfsvdc' })).present()
    }
    async onDotClick(item) {
        console.log(item)
        let modal = await this.$modal.create('TablesModal', { point: item.data }, { title: 'adfsvdc' })
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
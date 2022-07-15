// Created by Leo Zhang on 2022-07-08
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

export default class HomeAPage extends Vue {
    lineOpt = { category: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], data: [820, 932, 901, 934, 1290, 1330, 1320] }
    chartOpts = scatterOption;
    heatmapOpts = heatmap()
    loading = false
    mounted() {
        console.log('mounted', this.$route.query)
        // UsersService.userInfo('22')
        // UsersService.info()
    }

    async openHw() {
        (await this.$modal.create('HelloModal', {}, { title: 'adfsvdc', id: 1234235 })).present()
    }
    async onDotClick(item) {
        console.log(item)
        let modal = await this.$modal.create('TablesModal', { point: item.data }, { title: 'adfsvdc' })
        modal.present()

        modal.onDismissed().then(res => {
            console.log('onDismissed', res)
        })

        console.log(modal)
    }

}
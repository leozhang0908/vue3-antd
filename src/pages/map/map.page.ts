// Created by Leo Zhang on 2022-06-27
import { Options, Vue } from 'vue-class-component'
import CxmtMap from '@/components/cxmtmap/CxmtMap.vue'
@Options({
  name: 'map-page',
  components: { CxmtMap }
})

export default class extends Vue {

  mounted() {
  }
}
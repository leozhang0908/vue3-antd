// Created by Leo Zhang on 2022-07-08
import { Options, Vue } from 'vue-class-component'

@Options({
  components: {}
})

export default class HomeBPage extends Vue {
  mounted() {
    console.log('mounted', this.$route.query)
  }

}
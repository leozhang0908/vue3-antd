// Created by Leo Zhang on 2022-06-30
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'hello-modal',
  props: {
    text: { default: 'text' }
  }
})


export default class extends Vue {

  mounted() {}
}
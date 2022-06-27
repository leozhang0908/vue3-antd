// Created by Leo Zhang on 2022-06-25

import { Options, Vue } from 'vue-class-component';
import { message } from 'ant-design-vue';

@Options({
  name: 'tables-modal',
  props: {
    point: Object
  }
})

export default class extends Vue {
  message = message;
  activeKey = '2'
  current = 0;
  steps: any[] = [];
  mounted() {
    this.steps = [
      {
        title: 'First',
        content: 'First-content',
      },
      {
        title: 'Second',
        content: 'Second-content',
      },
      {
        title: 'Last',
        content: 'Last-content',
      },
    ]
  }
  next() {
    this.current++;
  }
  prev() {
    this.current--;
  }
}
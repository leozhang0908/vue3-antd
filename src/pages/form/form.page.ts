import { tableColumns } from '@/class/mock';
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import { FormInstance } from 'ant-design-vue';
import { cloneDeep } from 'lodash-es';
import { reactive, ref } from 'vue';
import { Options, Vue } from 'vue-class-component'
import lupload from '@/components/lupload.vue'
@Options({
  components: {
    DownOutlined,
    UpOutlined,
    lupload
  }
})
export default class extends Vue {
  layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  validateMessages: any = {};
  formState = {
    user: {
      name: '',
      age: undefined,
      email: '',
      website: '',
      introduction: '',
    },
  };
  mounted() {
    this.validateMessages = {
      required: '${label} is required!',
      types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
      },
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    }

  }

  onFinish = (values: any) => {
    console.log('Success:', values);
  }
}
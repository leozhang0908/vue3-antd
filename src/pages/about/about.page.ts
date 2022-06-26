import { tableColumns } from '@/class/mock';
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import { FormInstance } from 'ant-design-vue';
import { cloneDeep } from 'lodash-es';
import { reactive, ref } from 'vue';
import { Options, Vue } from 'vue-class-component'
@Options({
    components: {
        DownOutlined,
        UpOutlined,

    },
    setup() {
        console.log("setup I'm AboutPage")
        const formRef = ref<FormInstance>();
        return {
            formRef
        };
    }
})
export default class AboutPage extends Vue {
    items: any = [];
    columns: any[] = tableColumns;
    editableData: any = {}
    formState: any = {}
    expand = false;
    mounted() {
        for (let i = 0; i < 100; i++) {
            this.items.push({
                key: i.toString(),
                name: `Edrward ${i}`,
                age: 32,
                address: `London Park no. ${i}`,
            });
        }
    }
    edit(key: string) {
        this.editableData[key] = cloneDeep(this.items.filter(item => key === item.key)[0]);
    }
    save(key: string) {
        Object.assign(this.items.filter(item => key === item.key)[0], this.editableData[key]);
        delete this.editableData[key];
    }
    cancel(key: string) {
        delete this.editableData[key];
    };
    onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        console.log('formState: ', this.formState);
    };
}
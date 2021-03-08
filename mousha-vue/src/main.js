import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/public.css'
import 'element-ui/lib/theme-chalk/index.css';
import {
    Button,
    Select,
    Option,
    OptionGroup,
    Row,
    Col,
    Input,
    Form,
    FormItem,
    Upload,
    DatePicker,
    Dialog,
    RadioGroup,
    RadioButton,
    Checkbox,
    MessageBox,
    Message,
    Loading,
    Autocomplete
} from 'element-ui';
Vue.use(Autocomplete)
Vue.use(Button)
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Dialog);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Row);
Vue.use(Input)
Vue.use(Col)
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Upload);
Vue.use(DatePicker);
Vue.use(Checkbox);
Vue.config.productionTip = false
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
import axios from 'axios';
import qs from 'qs';
import quillEditor from 'vue-quill-editor' // 调用富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css' // 富文本编辑器外部引用样式  三种样式三选一引入即可
import "quill/dist/quill.bubble.css";
Vue.use(quillEditor)
    // Vue.prototype.$loading = Loading;
    // let HTTP = 'https://mousha.mx5918.com'; //测试
let HTTP = 'https://www.madami.ltd'; //正式
Vue.prototype.$urlHttp = HTTP;
// 接口请求1
Vue.prototype.$apiAxiox = (opt) => {
    // console.log(qs.stringify(opt.data));
    return new Promise((resolve, reject) => {
        axios({
                method: opt.method || "post",
                url: HTTP + opt.url,
                data: qs.stringify(opt.data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((res) => {
                resolve(res)
            })
            .catch(function(err) {
                reject(err)
            });
    })
};
import moment from 'moment' //导入文件 

Vue.prototype.$moment = moment; //赋值使用
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
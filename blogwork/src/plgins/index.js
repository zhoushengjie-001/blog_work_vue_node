import axios from 'axios'
import 'animate.css'
import moment from 'moment'
// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';

// 加载图标
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default {
    install(Vue) {
        Vue.prototype.$http = axios
        Vue.config.productionTip = false
        Vue.use(ElementUI);
        // 添加请求拦截器
        axios.interceptors.request.use(function (config) {
            // 出现进度条
            NProgress.start() 
            return config
        }, function (error) {
            return Promise.reject(error)
        })

        // 在 response 拦截器中，隐藏进度条 NProgress.done()
        axios.interceptors.response.use(config => {
            NProgress.done()
            return config
        })
        // 定义全局过滤器
        Vue.filter('time', (val, formatString) => {
            formatString = formatString || "YYYY年MM月"
            return moment(val).format(formatString)
        })
    }

}
//入口文件
import Vue from 'vue'
//1.1 导入路由的包
import VueRouter from 'vue-router'
//1.2 安装路由
Vue.use(VueRouter)

//导入格式化时间的插件 npm i moment -S
import moment from 'moment'

//定义全局的过滤器
Vue.filter('dateFormat',function (dataStr,pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})

//2.1导入vue-resource
import VueResource from 'vue-resource'
//2.2安装 vue-resource
Vue.use(VueResource)
//设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';//只能安装了vue-resource之后再全局配置资源地址
//全局设置 post 时候表单数据格式组织形式为 application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

//导入MUI的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import './lib/mui/fonts/mui-icons-extra.ttf'


//按需导入 Mint-UI 中的组件
/*import { Header, Swipe, SwipeItem,Button, Lazyload } from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload)*/

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

/*安装我们的图片预览插件*/
import VuePreview from 'vue-preview'
Vue.use(VuePreview)



//1.3导入自己的router.js 路由模块
import router from './router.js'


//导入App.vue文件
import app from './App.vue'

var vm = new Vue({
    el: '#app',
    data: {},
    methods: {},
    components: {},
    render: c => c(app),
    router  /*1.4 挂载路由对象到vm实例上*/
})
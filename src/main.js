//入口文件
import Vue from 'vue'

//导入MUI的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import './lib/mui/fonts/mui-icons-extra.ttf'


//按需导入 Mint-UI 中的组件
import { Header } from 'mint-ui'
Vue.component(Header.name,Header)


//导入App.vue文件
import app from './App.vue'

var vm = new Vue({
    el: '#app',
    data: {},
    methods: {},
    components: {},
    render: c => c(app)
})
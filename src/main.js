//入口文件
import Vue from 'vue'
//1.1 导入路由的包
import VueRouter from 'vue-router'
//1.2 安装路由
Vue.use(VueRouter)

//注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//每次刚进入网站，肯定会先调用main.js,在刚调用时，先从本地存储中，把购物车的数据读取出来，放到 store中
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
    state:{//this.$store.state.****
        car: car //将购物车中商品的相关数据，用一个数组存储起来，在car数组中存储商品的一些对象，商品对象可以设计为
        // {id：商品的id，count：商品的数量，price：商品的单价，selected：true/false 商品是否被选中}
    },
    mutations: {//this.$store.commit('方法的名称','按需传递唯一的参数')
        addToCar(state,goodsinfo){
            //点击加入购物车，将商品信息保存到store中的car上
            /*分析：
            * 1.若购物车之前已经有相应的商品了，则只需要更新数量
            * 2.若之前没有相应的商品数据，则将商品数据 push 到 car 中即可*/
            //假设在购物车中没有找到对应的商品
            var flag = false

            state.car.some(item => {
                if(item.id == goodsinfo.id ){
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })

            //如果最终循环完毕，得到的flag依旧是false，则把商品数据直接push到购物车中
            if(!flag){
                state.car.push(goodsinfo)
            }

            //当更新 car 之后，将car数组存储到本地的 localstorage 中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsInfo(state,goodsinfo){//修改购物车中商品的数量值
            /*分析：*/
            state.car.some(item => {
                if(item.id == goodsinfo.id){
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            //当修改完商品数量，把最新的商品数据保存到本地的localstorage
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        removeFromCar(state,id){
            //根据id，从store中的购物车中删除对应的那条商品数据
            state.car.some((item,i) => {
                if(item.id == id ){
                    state.car.splice(i,1)
                    return true;
                }
            })
            //将删除完毕后的最新商品数据保存到本地
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsSelected(state,info){
            state.car.some(item => {
                if(item.id == info.id){
                    item.selected = info.selected
                }
            })
            //把最新的所有购物车的开关状态，同步到store中
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    getters: {//this.$store.getters.****
        //相当于 计算属性，也相当于 filters 过滤器
        getAllCount(state){
            var c = 0;
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        getGoodsCount(state){
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelected(state){
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state){
            var o = {
                count:0,//勾选的数量
                amount: 0 //勾选的总价
            }
            state.car.forEach(item => {
                if(item.selected == true){
                    o.count += item.count
                    o.amount += item.price * item.count
                }
            })
            return o
        }
    }
})


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
    router,  /*1.4 挂载路由对象到vm实例上*/
    store  /* 挂载store 状态管理对象 */
})
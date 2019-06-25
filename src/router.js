//3.创建一个路由对象

import VueRouter from 'vue-router'

//导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from  './components/tabbar/MemberContainer.vue'
import ShopCarContainer from './components/tabbar/ShopCarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'


//创建路由对象
let router = new VueRouter({
    routes: [//配置路由规则
        { path: '/',redirect: '/home'},/*页面重定向，默认匹配到home页面*/
        { path: '/home',component: HomeContainer },/*配置路由链接*/
        { path: '/member',component: MemberContainer },
        { path: '/shopcar',component: ShopCarContainer },
        { path: '/search',component: SearchContainer },
        { path: '/home/newslist',component: NewsList },
        { path: '/home/newsinfo/:id',component: NewsInfo },
        { path: '/home/photolist',component: PhotoList }
    ],
    linkActiveClass: 'mui-active'/*覆盖默认的路由的高亮的类，默认的类叫做 router-link-active */
})

/*把路由对象暴露出去*/
export default router

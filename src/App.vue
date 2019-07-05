<template>
    <div class="app-container">
        <!--顶部header区域-->
        <mt-header fixed title="云海机电维修中心">
            <span slot="left" @click="goBack" v-show="flag">
                <mt-button icon="back">返回</mt-button>
            </span>
        </mt-header><!--Mint-UI中的Header组件-->


        <!--中间的路由 router-view 区域-->
        <transition>
            <router-view></router-view>
        </transition>


        <!--底部的 tabbar 区域-->
        <nav class="mui-bar mui-bar-tab"><!--mui中的tabbar组件-->
            <router-link class="mui-tab-item-zqq" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item-zqq" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item-zqq" to="/shopcar">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{ $store.getters.getAllCount }}</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item-zqq" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>

    </div>
</template>

<script>
export default {
    data(){
        return {
            flag: false
        };
    },
    created(){
        this.flag = this.$route.path === "/home" ? false : true;
        /*若this.$route.path === "/home"的话flag那就为false，如果this.$route.path 不等于 "/home"的话那就为true*/
    },
    methods:{
        goBack(){//点击后退
            this.$router.go(-1);
        }
    },
    watch:{//监听返回按钮的状态，若为首页的话返回区域隐藏，若不是首页的话则显示
        '$route.path':function (newVal) {
            if(newVal === "/home"){
                this.flag = false;
            }else{
                this.flag = true;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.mint-header{
    z-index: 99;/*为标题设置层级*/
}
.app-container{
    padding-top: 40px;
    overflow-x: hidden;
    padding-bottom: 50px;
}
.v-enter{/*实现页面动画*/
    opacity: 0;
    transform: translateX(100%);
}

.v-leave-to{/*实现页面动画*/
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
}

.v-enter-active,
.v-leave-active{/*实现页面动画*/
    transition: all 0.5s ease;
}

/*改类名，解决tabbar无法切换的问题*/
.mui-bar-tab .mui-tab-item-zqq.mui-active {
    color: #007aff;
}

.mui-bar-tab .mui-tab-item-zqq {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}

.mui-bar-tab .mui-tab-item-zqq .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-zqq .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
<template>
    <div>
       <!--轮播图区域-->
        <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
        <!--<mt-swipe :auto="4000">
            <mt-swipe-item>1</mt-swipe-item>
            <mt-swipe-item>2</mt-swipe-item>
            <mt-swipe-item>3</mt-swipe-item>
        </mt-swipe>-->

        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                <img src="../../images/新闻.png">
                <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photolist">
                <img src="../../images/图片.png">
                <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
                <img src="../../images/购物商城.png">
                <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/帮助.png">
                <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/视频.png">
                <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/对话信息.png">
                <div class="mui-media-body">联系我们</div></a></li>
        </ul>

    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import swiper from '../subcomponents/swiper.vue'

    export default {
        data(){
            return {
                lunbotuList: [] //保存轮播图的数组
            }
        },
        created(){
          this.getLunbotu();
        },
        methods:{
            getLunbotu(){//获取轮播图数据
                this.$http.get("api/getlunbo").then(result => {
                    //console.log(result.body)
                    if(result.body.status === 0 ){//获取数据成功
                        this.lunbotuList = result.body.message
                    }else{//获取数据失败
                        Toast('加载轮播图失败');
                    }
                })
            }
        },
        components: {
            swiper
        }
    }

</script>

<style lang="scss" scoped>
    .mui-grid-view.mui-grid-9 {
        background-color: #fff;
        border: none;
        img{
            width: 60px;
            height: 60px;
        }
        .mui-media-body{
            font-size: 13px;
        }
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        /*border-right: none;
        border-bottom: none;*/
        border: 0;
    }
</style>


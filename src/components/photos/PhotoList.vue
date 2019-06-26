<template>
    <div>
        <!--顶部滑动条区域-->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id == 0?'mui-active':'']" v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.id)">
                        {{ item.title }}
                    </a>
                </div>
            </div>

        </div>

        <!--图片列表区域-->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+ item.id" tag="li"><!--tag的作用：将router-link渲染为li标签-->
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{ item.title}}</h1>
                    <div class="info-body">{{ item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>

    </div>
</template>

<script>
/*1.导入mui的js文件*/
import mui from '../../lib/mui/js/mui.min.js'

export default {
    data(){
      return {
          cates: [] ,//所有分类的列表数组
          list:[] //图片列表的数组
      };
    },
    created(){
        this.getAllCategory();//一定要记得添加this，不然调用不到这个函数
        this.getPhotoListByCateId(0);//默认进入页面，就主动请求所有图片列表的数据
    },
    mounted(){
        //当组件中的DOM结构被渲染好并放到页面中，会执行这个钩子函数
        //如果要操作元素，最好在mounted里面，因为这时候的DOM元素是最新的
        /*2.初始化滑动控件*/
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    methods:{
        getAllCategory(){
            //获取所有的图片分类
            this.$http.get('api/getimgcategory').then(result => {
                if(result.body.status === 0){
                    //手动拼接出一个最完整的分类列表
                    result.body.message.unshift({ title: "全部",id:0 });
                    this.cates = result.body.message;
                }
            })
        },
        getPhotoListByCateId(cateId){
            //根据分类id获取分类列表
            this.$http.get('api/getimages/'+ cateId ).then( result => {
                if(result.body.status === 0){
                    this.list = result.body.message;
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
*{
    /*CSS属性 touch-action用于指定某个给定的区域是否允许用户操作，以及如何响应用户操作（例如浏览器自带的滑动、缩放等）*/
    /*为了解决点击滑动条时报错的现象，是Chrome为了提高页面滑动流畅度而开发的新东西*/
    touch-action: pan-y;/*启用单指垂直平移手势*/
}

.photo-list{
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
li{
     background-color: #fff;
     text-align: center;
     margin-bottom: 10px;
     box-shadow: 0 0 9px #999999;
     position: relative;
     img{
         width: 100%;
         vertical-align: middle;
     }
     img[lazy=loading] {
         width: 40px;
         height: 300px;
         margin: auto;
     }
     .info{
         color: white;
         text-align: left;
         position: absolute;
         bottom: 0;
         background-color: rgba(0,0,0,0.4);
         max-height: 84px;
         .info-title{
            font-size: 14px;
         }
         .info-body {
            font-size: 13px;
         }
     }
 }
}


</style>
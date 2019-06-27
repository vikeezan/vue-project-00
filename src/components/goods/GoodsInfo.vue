<template>
    <div class="goodsinfo-container">

        <!--商品轮播图区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                   <swiper :lunbotuList="lunbotu" :isfull="false"></swiper><!--将轮播图的数据传递给子组件-->
                </div>
            </div>
        </div>
        <!--商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsinfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{ goodsinfo.sell_price}}</span>
                    </p>
                    <p>购买数量：<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
                    <!--<p>购买数量：<numbox></numbox></p>-->
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车
                        </mt-button>

                        <!--分析：如何实现加入购物车的时候，拿到选择的数量？
                        1.经过分析发现，按钮属于goodsinfo页面，数字属于numberbox组件
                        2.涉及到了父子组件的嵌套，所以无法直接在 goodsinfo 中获取到选中的商品数量值
                        3.怎么解决这个问题呢？涉及到子组件向父组件传值（事件调用机制）
                        4.事件调用的本质：父向子传递方法，子调用该方法，同时把数据当做参数传递给这个方法-->
                    </p>
                </div>
            </div>
        </div>

        <!--小球动画-->
        <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter">
            <div v-show="ballFlag" class="ball" ref="ball"></div>
        </transition>

        <!--商品参数区域-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodsinfo.goods_no }}</p>
                    <p>库存情况：{{ goodsinfo.stock_quantity}}件</p>
                    <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>

    </div>
</template>

<script>
/*1.导入轮播图组件*/
import swiper from '../subcomponents/swiper.vue'
import numbox from '../subcomponents/goodsinfo_numbox.vue'

export default {
    data(){
        return {
            id: this.$route.params.id,//将路由参数中的 id 挂载到data上，方便后期调用
            lunbotu: [] ,//轮播图的数据
            goodsinfo: [] ,//获取到的商品信息
            ballFlag: false, //控制小球隐藏和显示的标识符
            selectedCount: 1 //保存用户选中的商品数量，默认为用户会买一个
        }
    },
    created(){
        this.getLunbotu();
        this.getGoodsInfo();
    },
    methods:{
        getLunbotu(){
            this.$http.get('api/getthumimages/' + this.id ).then(result => {
                if(result.body.status === 0 ){
                    //先循环轮播图数组的每一项，为 item 添加 img属性，因为 swiper 组件只认识 item.img，不认识 item.src
                    result.body.message.forEach( item => {
                       item.img = item.src;
                    });
                    this.lunbotu = result.body.message;
                }
            })
        },
        getGoodsInfo(){//获取商品的信息
            this.$http.get('api/goods/getinfo/' + this.id ).then( result => {
                if(result.body.status === 0){
                    this.goodsinfo = result.body.message[0];
                }
            });
        },
        goDesc(id){//点击使用编程式导航，点击跳转到图文介绍页面
            this.$router.push({ name:"goodsdesc",params:{ id } });
        },
        goComment(id){//点击使用编程式导航，点击跳转到商品评论页面
            this.$router.push({ name:"goodscomment",params:{ id } });
        },
        addToShopCar(){//添加到购物车
            this.ballFlag = !this.ballFlag;
        },
        beforeEnter(el){
            el.style.transform = "translate(0,0)";//小球原本被放置在哪里，哪里就是（0，0）位置
        },
        enter(el,done){
            el.offsetWidth; //为了实现小球动画

            /*小球动画优化思路：
            //1.分析导致动画不准确的本质原因：我们将小球最终位移到的位置局限在了某一分辨率下的，未滑动滚动条的情况下
            //2.只要分辨率和测试时不同，或者滚动条有一定的滑动距离之后，问题出现了；
            //3.因此经过分析之后的结论是：不能把位置的横纵坐标写死，而应该根据不同情况，动态计算这个坐标值；
            //4.解题思路：先得到徽标的横纵坐标，再得到小球的横纵坐标，然后让x和y分别求差值，得到的结果即x和y应该要位移的距离
            //5.如何获取徽标和小球的位置？？？ domObject.getBoundingClientRect()返回矩形对象，用于获得页面中某个元素各边与页面上边和左边的距离。*/

            /*获取小球在页面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();//属于当前页面，可以通过dom方法直接获取*/
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            //获取徽标在页面中的位置
            const badgePosition = document.getElementById('badge').getBoundingClientRect();
            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;

            el.style.transform = `translate(${xDist}px,${yDist}px)`;//特别注意这里不是‘’，而是``，好坑啊！！！！！
            el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";//ease 第三个参数为动画效果
            done()//代表afterEnter()函数的引用
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag;
        },
        getSelectedCount(count){
            //当子组件把选中的数量传递给父组件时，将选中的值保存到 data 上
            this.selectedCount = count;
            console.log('父组件拿到的count值为： ' + this.selectedCount );
        }
    },
    components: {
        swiper,
        numbox
    }  /*2.注册子组件*/

}
</script>

<style lang="scss" scoped>
.goodsinfo-container{
    background-color: #eeeeee;
    overflow: hidden;
    .now_price{
     color: red;
        font-size: 16px;
        font-weight: bold;
    }
    .mui-card-footer{
        display: block;
        button{
            margin: 15px 0;
        }
    }
    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;/*设置元素的堆叠顺序，更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面。*/
        top:428px;
        left: 79px;
        /*transform: translate(158px,434px)*//*149px,614px*/
    }
}
</style>
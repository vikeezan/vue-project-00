<template>
    <div>
        <mt-swipe :auto="4000">
            <!--以后谁调用 轮播图 组件，谁就给我们传递lunbotuList -->
            <!--此时，lunbotuList 应该是父组件向子组件传递值来设置-->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
                <img :src="item.img" alt="" :class="{ 'full':isfull }">
            </mt-swipe-item>
        </mt-swipe>
    </div>

<!--分析：为什么商品评论中的轮播图样式不好看？
1.首页中的图片，它的宽和高都使用了 100% 的宽度
2.商品详情页中，轮播图图片的宽高也为 100% 的话，会造成页面不好看
3.商品详情页面中的轮播图，期望高度是 100%，但是宽度为自适应
4.经过分析:得到问题的原因，首页中的轮播图和商品详情中的轮播图分歧点是【宽度为100% 还是自适应】
5.既然两个轮播图别的地方相同，只有宽度的设置上有分歧，那么我们可以定义一个属性，让轮播图的调用者，手动来指定宽度到底为 100% 还是自适应-->


</template>

<script>
export default {
    props: ["lunbotuList","isfull"]//如果要调用我，必须传递给我lunbotuList这样的一个数据，否则调用不成功
}
</script>

<style lang="scss" scoped>
    .mint-swipe {
        height: 200px;
        /*后代选择器*/
        /*.mint-swipe-item:nth-child(1){*/
        /*background-color: #2ac845;*/
        /*}*/
        /*.mint-swipe-item:nth-child(2){*/
        /*background-color: #0062cc;*/
        /*}*/
        /*.mint-swipe-item:nth-child(3){*/
        /*background-color: #8a6de9;*/
        /*}*/


        .mint-swipe-item {/*scss交集选择器*/
            text-align: center;
        }

        img{
            //width: 100%;
            height: 100%;
        }
    }

    .full{
        width:100%;
    }
</style>
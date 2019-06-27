<template>
    <!--不知道什么时候会拿到max值，但有一刻，我们会得到一个真正的 max 值-->
    <!--我们可以使用watch属性监听，来监听父组件传递过来的max值，不论watch被触发几次，最后一次的监听值一定是一个合法的 max 数值-->
    <div>
        <div class="mui-numbox" data-numbox-min='1'>
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
    </div>


    <!--分析：子组件什么时候 把数据传递给父组件？-->
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'

export default {
    mounted() {
        //初始化数字选择框组件
        mui('.mui-numbox').numbox();
        console.log(this.max)
    },
    methods:{
        countChanged(){
            //每当文本框的数据被修改时，立即把最新的数据通过事件调用，传递给父组件
            //console.log(this.$refs.numbox.value)
            this.$emit("getcount",parseInt(this.$refs.numbox.value))//子组件的数值传递给父组件
        }
    },
    props: ["max"],
    watch:{
        //属性监听
        'max':function (newVal,oldVal) {//只要max改变了，就立马将其设置为最大值
            //使用JS API 设置numbox的最大值
            mui('.mui-numbox')
            .numbox().setOption('max',newVal);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
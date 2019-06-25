<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入你的评论：（最多输入140字）" maxlength="140"></textarea>
        <mt-button type="primary" size="large">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_name | dateFormat }}
                </div>
                <div class="cmt-body">
                    <!--若有数据为undefined，则将评论展示位默认值-->
                    {{ item.content === 'undefined'?'此用户很懒，什么也没留下':item.content }}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui'

    export default {
        data(){
            return {
                pageIndex: 1 ,//默认展示第一页数据
                comments: []  //所有评论数据
            }
        },
        created(){
            this.getComments();
        },
        methods:{
            getComments(){//获取评论
                this.$http.get("api/getcomments/"+ this.id + "?pageindex=" + this.pageIndex).then(result => {
                    if(result.body.status === 0 ){
                        //this.comments = result.body.message;
                        //每当获取新的评论数据时，不要把老数据清空覆盖，而应在老数据之后接上新的数据
                        this.comments = this.comments.concat(result.body.message)
                    }else{
                        Toast('获取评论失败！');
                    }
                })
            },
            getMore(){//加载更多,页面加1，再重新调用一次getComments()方法
                this.pageIndex++;
                this.getComments();
            }
        },
        props:["id"]
    }
</script>

<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list{
        margin: 5px 0;
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                line-height: 30px;
                background-color: #9d9d9d;
            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}
</style>
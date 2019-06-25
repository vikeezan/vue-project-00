<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入你的评论：（最多输入140字）" maxlength="140" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.time">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.time | dateFormat }}
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
                comments: [],  //所有评论数据
                msg: ''//评论输入的内容，默认为空
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
            },
            postComment(){//发表评论
                //校验是否为空内容
                if(this.msg.trim().length === 0){
                    return Toast("评论内容不可以为空！");
                }

                //post请求参数1：请求的URL地址
                //post请求参数2：提交给服务器的数据对象{ content：this.msg }
                //post请求参数3：定义提交的时候，表单中数据的格式{ emulateJSON：true }
                this.$http.post('api/postcomment/' + this.$route.params.id,{
                    content: this.msg.trim()
                })
                .then(function (result) {
                    if(result.body.status === 0){
                        //1.拼接出一个评论对象
                        var cmt = {
                            user_name: "匿名用户",
                            add_time: Date.now(),
                            content:this.msg.trim()}
                    };
                        this.comments.unshift(cmt);
                        this.msg = '';
                });
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
#这是黑马程序员vue教程的结课项目

##[主流开源协议之间的区别？]（https://www.zhihu.com/question/19568896）

##怎么用传统的方式将修改过后的代码上传到github？
1. git add .
2. git commit -m "提交信息"
3. git push

##制作首页App组件
1. 完成 Header 区域，使用的是 Mint-UI 中的 Header 组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabbar.html
 + 在制作购物车小图标的时候，操作相对多一些；
 + 先把扩展的.css样式文件，拷贝到项目中
 + 拷贝扩展字体库的 ttf 文件到项目中
 + 为购物车小图标添加如下样式 'mui-icon mui-icon-extra mui-icon-extra-cart'
3. 要在中间区域放置一个 router-view 来展示路由匹配到的组件

##将中间区域放上路由
1.改造tabbar为router-link
2.设置路由为高亮
3.点击 tabbar 中的路由链接，展示对应的路由组件

##制作首页轮播图布局，需要加载首页轮播图数据
1.使用vue-resource获取数据
2.使用 vue-resource 的 this.$http.get获取数据
3.获取到的数据，要保存到 data 身上
4.使用 v-for 循环渲染每一个 item 项

##改造九宫格区域的样式
##改造新闻资讯路由链接
##新闻资讯 页面 制作
1.绘制页面，使用mui中的 media-list.html
2.使用 vue-resource 获取数据
3.渲染真实数据

##实现新闻资讯列表点击跳转到详情页
1.把列表中的每一项改造为router-link，同时跳转时提供唯一的id
2.创建新闻详情的组件页面 NewsInfo.vue
3.在路由模块中将新闻详情的路由地址和组件页面对应起来

##实现新闻详情的 页面布局 和 数据渲染
##单独封装一个comment.vue 评论子组件
1.先创建一个单独的 comment.vue 组件模板
2.在需要使用comment组件的页面中，先手动导入 comment 组件
 + `import commnet from './comment.vue`
3.在父组件中，使用`components`属性，将刚才导入的 comment 组件，注册为自己的 子组件
4.将注册子组件时候的注册名称，以标签形式在页面中引用即可

##获取所有的评论数据显示到页面中
##实现点击加载更多评论的功能
1.为加载更多按钮，绑定点击事件，在事件中点击请求下一页数据
2.点击加载更多，pageIndex++，然后重新调用 this.getComments()方法，重新获取新一页的数据
3.为了防止新数据覆盖老数据，在点击加载更多时，每当获取到新数据，应该让老数据调用数组的contact（）方法，拼接上新数组












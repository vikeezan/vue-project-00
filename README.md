 # 这是黑马程序员vue教程的结课项目

 ## [主流开源协议之间的区别？]（https://www.zhihu.com/question/19568896）

 ## 怎么用传统的方式将修改过后的代码上传到github？
 1. git add .
 2. git commit -m "提交信息"
 3. git push

 ## 制作首页App组件
 1. 完成 Header 区域，使用的是 Mint-UI 中的 Header 组件
 2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabbar.html
 + 在制作购物车小图标的时候，操作相对多一些；
 + 先把扩展的.css样式文件，拷贝到项目中
 + 拷贝扩展字体库的 ttf 文件到项目中
 + 为购物车小图标添加如下样式 'mui-icon mui-icon-extra mui-icon-extra-cart'
 3. 要在中间区域放置一个 router-view 来展示路由匹配到的组件

 ## 将中间区域放上路由
 1.改造tabbar为router-link
 2.设置路由为高亮
 3.点击 tabbar 中的路由链接，展示对应的路由组件

 ## 制作首页轮播图布局，需要加载首页轮播图数据
 1.使用vue-resource获取数据
 2.使用 vue-resource 的 this.$http.get获取数据
 3.获取到的数据，要保存到 data 身上
 4.使用 v-for 循环渲染每一个 item 项

 ## 改造九宫格区域的样式
 ## 改造新闻资讯路由链接
 ## 新闻资讯 页面 制作
 1.绘制页面，使用mui中的 media-list.html
 2.使用 vue-resource 获取数据
 3.渲染真实数据

 ## 实现新闻资讯列表点击跳转到详情页
 1.把列表中的每一项改造为router-link，同时跳转时提供唯一的id
 2.创建新闻详情的组件页面 NewsInfo.vue
 3.在路由模块中将新闻详情的路由地址和组件页面对应起来

 ## 实现新闻详情的 页面布局 和 数据渲染
 ## 单独封装一个comment.vue 评论子组件
 1.先创建一个单独的 comment.vue 组件模板
 2.在需要使用comment组件的页面中，先手动导入 comment 组件
 + `import commnet from './comment.vue`
 3.在父组件中，使用`components`属性，将刚才导入的 comment 组件，注册为自己的 子组件
 4.将注册子组件时候的注册名称，以标签形式在页面中引用即可

 ## 获取所有的评论数据显示到页面中
 1.getComments

 ## 实现点击加载更多评论的功能
 1.为加载更多按钮，绑定点击事件，在事件中点击请求下一页数据
 2.点击加载更多，pageIndex++，然后重新调用 this.getComments()方法，重新获取新一页的数据
 3.为了防止新数据覆盖老数据，在点击加载更多时，每当获取到新数据，应该让老数据调用数组的contact（）方法，拼接上新数组

 ## 发表评论
 1.把文本框做双向数据绑定
 2.为 发表评论按钮 绑定事件
 3.校验评论内容是否为空，如果为空，则Toast提示用户评论内容不能为空
 4.通过 vue-resource 发送一个请求，把评论内容提交给服务器
 5.当发表评论成功后，重新刷新列表，以查看最新的评论
 + 如果调用 getComments 方法重新刷新评论列表的话，可能只能得到最后一页的评论，前几页的评论没有了
 + 当评论成功后，在客户端，手动拼出一个最新的评论对象，然后调用数组的 unshift 方法，把最新的评论追加到data中comments的开头；这样就能完美实现刷新评论列表的需求

 ## 改造图片分享按钮为路由的而连接并显示对应的组件页面
 ## 绘制图片列表组价页面结构，并美化样式
 1.制作顶部的滑动条
 2.制作底部的图片列表
 ## 制作顶部滑动条中注意点：
 1.需要借助MUI中的tab-top-webview-main.html
 2.需要把 slider区域中的 mui-fullscreen 类删除
 3.滑动条无法正常触发滑动，通过检查官方文档，发现这是js组件，需要被初始化一下：
 + 导入 mui.js
 + 调用官方提供的方式去初始化
 `mui('.mui-scroll-wrapper').scroll({
     	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
     });`
 4.在初始化滑动条的饿时候，导入了mui.js，但是控制台报错：`TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions `
 + 经过猜测，可能是mui.js中用到了'caller’，'callee', 和 'arguments'，但webpack打包好的bundle.js文件时遵循严格模式的，所以两者起了冲突
 + 解决方案：1.把mui.js中的非严格模式代码更改掉，但不现实；2.把webpack打包时候的严格模式禁用掉;
 + 最终我们选择了移除严格模式：使用这个插件babel-plugin-transform-remove-strict-mode
 5.刚进入图片分享页面时，滑动条无法正常工作，进过分析，发现如果要初始化 滑动条，必须要等待DOM元素加载完毕，所以我们将初始化滑动条的代码，放到了 mounted 生命周期函数中；
 6.当滑动条调试OK后，发现底部的tabbar无法正常工作了，这时候，我们需要把每个tabbar按钮样式中的‘mui-tab-item’重新改一下名字
 7.获取所有分类，并渲染分类列表；
 
 ## 制作图片列表区域：
 1.图片列表需要使用懒加载技术，我们可以使用 Mint-UI 提供现成的组件 ‘lazy-load’
 2.根据‘lazy-load’的使用文档，尝试使用
 3.渲染图片列表数据
 
 ## 实现了图片列表的懒加载改造和样式美化
 ## 实现了图片














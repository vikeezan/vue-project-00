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

##改造九宫格区域的样式：
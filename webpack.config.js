//这是webpack的配置文件:
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const path = require('path')

const webpack = require('webpack')//引入webpack模块

const htmlWebpackPlugin = require('html-webpack-plugin')

//node的语法，配置文件即为js文件，通过node中的模块操作，向外暴露了一个配置对象
module.exports = {
    //  在配置文件中，需要手动指定 入口 和出口
    entry: path.join(__dirname,'./src/main.js'),// 入口，表示要用webpack打包哪个文件
    output: {//出口
        path: path.join(__dirname,'./dist'),//指定打包好的文件放入哪个文件夹
        filename: 'bundle.js'//这里指定输出文件的文件名称
    },
    //插件数组，只要是插件全部放进这里
    plugins:[
        new webpack.HotModuleReplacementPlugin(),//new一个热更新的模块对象，这是启用热更新的第3步
        new htmlWebpackPlugin({//创建一个在内存中生成 HTMK页面的插件
            template: path.join(__dirname,'./src/index.html'),//指定模板界面，将来会根据指定的页面路径，去生成内存中的页面
            filename: 'index.html'//指定生成页面的名称
        }),
        new VueLoaderPlugin()
    ],
    module: {//这个节点用于配置所有 第三方 模块加载器
        rules:[//所有第三方模块的匹配规则
            { test: /\.css$/,use:['style-loader','css-loader'] },//配置处理所有.css文件,第三方loader模块名
            { test:/\.less$/,use:['style-loader','css-loader','less-loader' ]},//配置处理 .less 文件的第三方loader规则
            { test:/\.scss$/,use:['style-loader','css-loader','sass-loader']}, //配置处理.scss文件的第三方loader规则
            { test:/\.(jpg|png|gif|bmp|jpeg)$/,use: 'url-loader?limit=false&name=[hash:8]-[name].[ext]'},//处理图片路径的loader
            { test:/\.(ttf|svg|eot|woff|woff2)$/,use:'url-loader' }, //配置处理字体文件
            { test:/\.js$/, use: 'babel-loader',exclude: /node_modules/ },//配置处理高级的ES6&7语法
            { test:/\.vue$/,use: 'vue-loader'}//配置处理.vue文件的loader
        ]
    },
    resolve:{
        alias:{//修改vue被导入时候包的路径
            "vue$": "vue/dist/vue.js"
        }
    }
}
//1.导入vue的指令：npm i vue -S
//2.配置处理.vue外部文件：npm i vue-loader vue-template-compiler -D
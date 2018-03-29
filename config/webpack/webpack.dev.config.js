const webpack = require('webpack'); //引入webpack
const opn = require('opn'); // 打开浏览器
const merge = require("webpack-merge"); //webpack配置文件合并
const path = require("path"); //文件路径相关
const baseWebpackConfig = require("./webpack.base.config.js"); //基础配置
const webpackFile = require("./webpack.file.config.js"); //文件配置

let config = merge(baseWebpackConfig, {
    output: {
        path: path.resolve(webpackFile.devDirectory),
        filename: "js/[name].js",
        chunkFilename: 'js/[name]-[id].js',
        publicPath: ''
    },


    // 插件配置
    plugins: [
        // 设置开发环境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            }
        }),
        //设置热更新
        new webpack.HotModuleReplacementPlugin(),
    ],


    // loader配置
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: ['babel-loader'],
            include: [
                path.resolve(__dirname, "../../app"),
                path.resolve(__dirname, "../../app"),
            ],
            exclude: [
                path.resolve(__dirname, "../../node_modules")
            ],
        }]
    },

    // 设置api转发
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        hot: true,
        inline: true,
        contentBase: path.resolve(webpackFile.devDirectory),
        historyApiFallback: true,
        disableHostCheck: true,
        proxy: [{
            context: ['/api/**', '/u/**/'],
            target: "http://a92.168.12.100:8080",
            secure: false
        }],
        after() {
            opn('http://localhost:' + this.port)
        }
    }
})

module.exports = config;
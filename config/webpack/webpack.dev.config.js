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
        // common 业务公共代码，vendor引入第三方
        // new webpack.optimize.CommonsChunkPlugin({
        //     name:['common',"vendor"]
        // }),
        // // 防止vendor hash变化
        // new webpack.optimize.CommonsChunkPlugin({
        //     name:'manifest',
        //     chunks:['vendor']
        // })
    ],


    // loader配置
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                use: ['cache-loader', 'babel-loader'],
                /*打包速度优化*/
                include: [
                    path.resolve(__dirname, "../../app"),
                    path.resolve(__dirname, "../../entryBuild"),
                ],
                exclude: [
                    path.resolve(__dirname, "../../node_modules")
                ],
            },
            {
                test: /\.(css|pcss)$/,
                use: [{
                        loader: "style-loader",
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            config: {
                                path: "postcss.config.js"
                            }
                        }
                    }
                ],
                exclude: [
                    path.resolve(__dirname, "../../node_modules")
                ],
            },
            // file-loader 配置文件解析器
            {
                test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg|swf)$/,
                use: [{
                    loader: 'file-loader',
                    query: {
                        name: "[name].[ext]",
                        outputPath: `${webpackFile.resource}/`
                    }
                }]
            }
        ]
    },

    // 设置api转发
    devServer: {
        host: '127.0.0.1',
        port: 8080,
        hot: true,
        inline: true,
        contentBase: path.resolve(__dirname, "../../app/build"),
        historyApiFallback: true,
        disableHostCheck: true,
        proxy: [{
            context: ['/api/**', '/u/**/'],
            target: "http://192.168.12.100:8080",
            secure: false
        }],
        after() {
            opn('http://localhost:' + this.port)
        }
    }
})

module.exports = config;
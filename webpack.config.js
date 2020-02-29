const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackConfig = {
    entry: './src/index.js',
    mode: "production",
    module: {
        rules: [{
                test: /\.js|jsx$/,
                use: 'babel-loader',
                exclude: /(node_modules)/
            },
            /* {
                test:/\.txt$/,
                use:["./loader/upcaseLoader.js","./loader/reverseLoader.js"]
            }, */
            {
                test: /\.(less|css)$/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS
                }, {
                    loader: 'less-loader', // compiles Less to CSS
                    options: {
                        javascriptEnabled: true
                    }

                }],
                // ...other rules
            },


            // { test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'},

            { //rules里面可以配置各种文件处理的规则
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)$/, //匹配以jpg|png|jpeg|gif结尾的文件
                use: [{ //使用的loader
                    loader: 'url-loader', //这里用url-loader来处理图片
                    options: {
                        name: '[name].[ext]?[hash]',
                        publicPath: './imgs',
                        outputPath: 'imgs',
                        limit: 204800, //  当打包的图片文件小于204800Byte时, 将图片编译成base64的形式，进行打包。如果大于204800Byte时，则使用file-loader进行打包
                    }
                }, ]
            },
            //{ test: /\.(gif|jpg|png|woff|svg|eot|ttf)$/, loader: "file-loader?name=images/[hash:8].[name].[ext]" }



        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([{
            from: 'favicon.ico'
        }]),
        new HtmlWebpackPlugin({
            template: "./index.html"
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    optimization: {
        splitChunks: {

            chunks: 'all', // 默认 async 可选值 all 和 initial

            maxInitialRequests: 10, // 一个入口最大的并行请求数

            minSize: 0, // 避免模块体积过小而被忽略

            minChunks: 1, // 默认也是一表示最小引用次数

            cacheGroups: {

                vendor: {

                    test: /[\\/]node_modules[\\/]/, // 如果需要的依赖特别小，可以直接设置成需要打包的依赖名称

                    name(module, chunks, chcheGroupKey) { // 可提供布尔值、字符串和函数，如果是函数，可编写自定义返回值

                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1] // 获取模块名称

                        return `npm.${packageName.replace('@', '')}` // 可选，一般情况下不需要将模块名称 @ 符号去除

                    }

                }

            }

        }
    },
    devServer: {
        port: "9000"
    }
}



//console.log(env);
module.exports = webpackConfig;
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackConfig = {
    entry: './src/index.js',
    mode:"production",
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                use: 'babel-loader',
                exclude: /(node_modules)/
            },


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
            
            {    //rules里面可以配置各种文件处理的规则
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)$/,     //匹配以jpg|png|jpeg|gif结尾的文件
                use: [{             //使用的loader
                    loader: 'url-loader',    //这里用url-loader来处理图片
                    options: {
                        name: '[name].[ext]?[hash]',
                        publicPath: './imgs',
                        outputPath: 'imgs',
                        limit: 204800,                   //  当打包的图片文件小于204800Byte时, 将图片编译成base64的形式，进行打包。如果大于204800Byte时，则使用file-loader进行打包
                    }
                },
                ]
            },
            //{ test: /\.(gif|jpg|png|woff|svg|eot|ttf)$/, loader: "file-loader?name=images/[hash:8].[name].[ext]" }



        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {from:'favicon.ico'}
        ]),
        new HtmlWebpackPlugin({
            template:"./index.html"
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    devServer:{
        port:"9000"
    }
}



//console.log(env);
module.exports = webpackConfig;
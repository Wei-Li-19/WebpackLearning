const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const X_ENV = process.env.ENV;
console.log('X_ENV>>>',X_ENV);
const version = process.env.VERSION;
console.log("version>>>", version);


const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})],//对css代码进行压缩与合并
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,//,style-loader会将样式写入到js文件中
                    'css-loader',
                    'postcss-loader'
                ],
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin([`dist/${X_ENV}/${version}`], {
            root: path.resolve(__dirname, '../')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].chunk.css'
        }),
    ],
    output: {
        // publicPath:`https://scdn.xchanger.cn/ecarx-web/rankingReward-${X_ENV}/${X_ENV}/${version}/`,
        path: path.resolve(__dirname, `../dist/${X_ENV}/${version}/`)
    }
}

module.exports = merge(commonConfig, prodConfig);

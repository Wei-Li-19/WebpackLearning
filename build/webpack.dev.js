const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const devConfig = {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: './dist',//启的node服务从哪里取静态文件
		open: true,//是否打开浏览器
		port: 8080,//设置端口号
		hot: true,//是否热更新
	},
	module:{
		rules:[
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'// 自动添加厂商前缀的loader
                ]
            },
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	optimization: {
		usedExports: true,// 是否使用tree shaking, production模式下默认是开启的,development模式下会通过unused harmony export来标记是否被引用, 使用tree shaking的前提引用和导出使用es module规范
	}
}

module.exports = merge(commonConfig, devConfig);

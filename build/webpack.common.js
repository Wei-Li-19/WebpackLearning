const HtmlWebpackPlugin = require('html-webpack-plugin');
// const TestWebpackPlugin = require('../plugins/TestWebpackPlugin');

module.exports = {
	entry: {//模块入口起点,可以配置多个入口
		main: './src/index.js',
        // index: './src/index12.js',
	},
    resolveLoader: {
        modules: ['node_modules', './loaders']
    },
    module: { // webpack使用的是node环境,它只能识别JavaScript代码文件,其他格式的文件它处理不了,各种loader的作用就是将这些文件翻译成js
        rules: [{
            test: /\.js$/,// 使用正则匹配出需要处理的文件
            exclude: /node_modules/,// 排除不需要处理的文件夹
            loader: [// 匹配到的文件使用哪个loader
                {
                    loader:'babel-loader'
                },
                {
                    loader: 'testLoaderAsync',// 自定义异步loader
                    options: {
                        name: '~w~'
                    }
                },
                {
                    loader: 'testLoader',// 自定义同步loader
                },

            ],
        },{
            test: /\.(jpg|png|gif)$/,
            use: {
                loader: 'url-loader',// 一个图片处理loader,继承与file-loader,可以将小图片以base64的形式打包到js文件中
                options: { // loader里的options字段可以配置loader需要的自定义参数,每个loader options里可以自定义的字段都不同,需要大家用哪个就翻api看看有没有需要的
                    name: '[name]_[hash].[ext]',//通过站位符的形式可以自定义打包图片的名称, 原始名称_hash值.原始后缀
                    limit: 10240,//一个图片大小限制超过10240字节,就是10kb,以单独的文件形式打包出来,低于这个以base64的形式放到js代码中
                    outputPath: 'images/',// 打包后的图片输出到什么位置
                }
            }
        },
            ]
    },
	plugins: [
		new HtmlWebpackPlugin({//使用'src/'路径下的index.html做完模板,生成一个HTML文件,并将生成的js文件和css以 <script>与<link>标签的形式加入的这个HTML文件中
			template: 'src/index.html'
		}),
        // new TestWebpackPlugin(),//自定义plugin
	],
    optimization: {
        splitChunks: {
            chunks: 'all',// 代码分割模式,"initial" | "all" | "async" 默认async 只有异步引入才分割文件,'all'异步同步代码都分割
            minSize: 30000,//超过多大字节才分包,这里限制30kb
            minChunks: 1,// 引用超过几次才分包
            maxAsyncRequests: 5,// 异步js包同时请求几个
            maxInitialRequests: 3,// 最大初始化请求数 同步js包同时发几个请求,
            automaticNameDelimiter: '~',//公共代码包名称分隔符
            name: true,//是否自定义包名,为false时使用的是chunks的id
            cacheGroups: { //缓存组,所有js代码都会放到这里,然后进行规则匹配,符合哪个规则就放到哪个文件中
                vendors: {
                    test: /[\\/]node_modules[\\/]/,//匹配规则. 传入类型RegExp、String和Function
                    priority: -20,//缓存规则优先级
                    // filename: 'vendors.js',
                },
                default: {
                    priority: -10,
                    reuseExistingChunk: true,//是否重用该chunk,同样代码只打包一份,都从一个地方引用
                    filename: 'common.js'
                }
            }
        }
    },
	output: {
		filename: '[name].js',//输出文件名称
	}
}

const path = require('path');

module.exports = {
	mode: 'production',
	entry: './h5NativeBridge.js',
	output: {
		path: path.resolve(__dirname, ''),
		filename: 'index.js',//打包文件名称
		library: 'h5NativeBridge',// 以<script>标签形式引入时注入的全局变量名称
		libraryTarget: 'umd'//组件支持的引用方式 还可以填this window
	}
}

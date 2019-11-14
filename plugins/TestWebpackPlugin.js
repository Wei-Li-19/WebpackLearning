class TestWebpackPlugin {

	apply(compiler) {

		compiler.hooks.compile.tap('TestWebpackPlugin', (compilation) => {
            console.log('以同步方式触及 compile 钩子。')
		})

		compiler.hooks.emit.tapAsync('TestWebpackPlugin', (compilation, callback) => {
            console.log('以异步方式触及 run 钩子。')
            callback()
			debugger;
			compilation.assets['TestWebpackPlugin.txt']= {
				source: function() {
					return 'hello webpackPlugin'
				},
				size: function() {
					return 19;
				}
			};
            callback();
		})
	}

}

module.exports = TestWebpackPlugin;

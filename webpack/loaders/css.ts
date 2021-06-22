const MiniCssExtractPlugin = require('mini-css-extract-plugin');

export default {
	client: {
		test: /\.css$/,
		use: [
			MiniCssExtractPlugin.loader,
			{
				loader: 'css-loader',
				options: {
					url: false,
					modules: false
				}
			},
			'postcss-loader'
		]
	},
	server: {
		test: /\.css$/,
		loader: 'null-loader'
	}
};

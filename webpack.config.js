const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	target: 'node',
	entry: ['./server/server.ts', './src/styles/style.css'],
	output: {
		path: path.join(__dirname, '/dist'),
        filename: 'server.js',
        libraryTarget: 'commonjs2'
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js']
	},
	devServer: {
		contentBase: path.join(__dirname, 'src'),
		historyApiFallback: true,
		port: 4000,
	  },
	module: {
		rules: [
			{
				test: /\.(js|ts)x?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
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
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'fonts/[name].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/style.css',
		}),
		new CopyWebpackPlugin({
			patterns: [
				{from: './src/styles/fonts', to: 'fonts'},
				{from: './images', to: 'images'},
				{from: './sw.js'}
			]
		}
		)
	]
};

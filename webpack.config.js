const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: ['./src/index.tsx', './src/styles/style.css'],
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js']
	},
	devServer: {
		contentBase: path.join(__dirname, 'src'),
		historyApiFallback: true,
		port: 8080,
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
							name: 'fonts/[name].[hash:5].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:5].[id].css',
			chunkFilename: 'css/[name].[contenthash:5].[id].css'
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html'
		}),
		new CopyWebpackPlugin({
			patterns: [
				{from: './src/styles/fonts', to: 'fonts'},
				{from: './public/images', to: 'images'}
			]
		}
		)
	]
};

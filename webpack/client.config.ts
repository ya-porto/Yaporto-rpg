import path from 'path';
import {Configuration, WebpackPluginInstance as Plugin, Entry} from 'webpack';
import {TsconfigPathsPlugin} from 'tsconfig-paths-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import {IS_DEV, DIST_DIR, SRC_DIR} from './env';
import fileLoader from './loaders/file';
import cssLoader from './loaders/css';
import jsLoader from './loaders/js';

const config: Configuration = {
	entry: ([
		path.join(SRC_DIR, 'client')
	].filter(Boolean) as unknown) as Entry,
	module: {
		rules: [fileLoader.client, cssLoader.client, jsLoader.client]
	},
	output: {
		path: DIST_DIR,
		filename: '[name].js',
		publicPath: '/'
	},
	resolve: {
		modules: ['src', 'node_modules'],
		extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
		plugins: [new TsconfigPathsPlugin({configFile: './tsconfig.json'})]
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{from: './src/styles/fonts', to: 'fonts'},
				{from: './images', to: 'images'},
				{from: './sw.js'}
			]
		}
		),
		new MiniCssExtractPlugin({filename: 'css/style.css'}),
		!IS_DEV && new CompressionPlugin(),
		new LoadablePlugin()
	].filter(Boolean) as Plugin[],

	devtool: 'source-map',

	performance: {
		hints: IS_DEV ? false : 'warning'
	}
};

export default config;

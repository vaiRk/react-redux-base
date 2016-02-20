'use strict';

var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Exclude every module except superagent-service.
 * @type {RegExp}
 */
var exclude = /(node_modules\/(?!superagent-service).*)/;

module.exports = {
	context: __dirname,
	target: 'web',
	devtool: undefined,
	entry: {
		app: 'src/js/index.js',
		dependencies: [
			'react',
			'react-dom',
			'react-router',
			'history',
			'redux',
			'react-redux',
			'redux-thunk',
			'redux-logger',
			'superagent-service',
			'lodash',
			'classnames'
		]
	},
	output: {
		path: 'build',
		publicPath: '/',
		sourceMapFilename: 'assets/js/maps/[name].map',
		filename: 'assets/js/[name].js',
	},
	resolve: {
		root: __dirname,
		extensions: ['', '.js', '.jsx', '.css', '.scss'],
		modulesDirectories: [
			'node_modules',
			'src/js',
			'src/scss'
		]
	},
	module: {
		loaders: [
			{ test: /\.jsx?$/, exclude: exclude, loader: 'babel' },
			{ test: /\.css$/, include: /normalize.css/, loader: 'style!css?sourceMap' },
			{
				test: /\.scss$/,
				exclude: exclude,
				loader: 'style!css?sourceMap!autoprefixer?browsers=last 2 versions!sass?sourceMap'
			}
		]
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'dependencies',
			filename: 'assets/js/[name].js?[hash]'
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: 'body'
		}),
		new webpack.SourceMapDevToolPlugin({
			filename: 'assets/js/maps/[name].map',
			exclude: ['assets/js/dependencies.js'],
			columns: false,
			module: true
		}),
		new webpack.NoErrorsPlugin()
	]
}
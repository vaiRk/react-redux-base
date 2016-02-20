'use strict';

var webpack = require('webpack');
var path = require('path');
var baseConfig = require('./webpack.config');
var assign = require('lodash/assign');

module.exports = assign({}, baseConfig, {
	debug: true,
	bail: false,
	devServer: {
		hot: true,
		contentBase: 'build',
		progress: true,
		quiet: false,
		noInfo: false,
		stats: {
			// Configure the console output
			colors: true,
			assets: true,
			version: false,
			hash: false,
			timings: true,
			chunks: false,
			chunkModules: false
		},
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	},
	module: {
		loaders: baseConfig.module.loaders.map(function(loader) {
			if (loader.test.toString() === /\.jsx?$/.toString()) {
				loader.loader = 'react-hot!' + loader.loader;
			}
			return loader;
		})
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		})
	].concat(baseConfig.plugins)
})
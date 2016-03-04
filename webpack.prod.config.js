'use strict';

var webpack = require('webpack');
var path = require('path');
var baseConfig = require('./webpack.config');
var assign = require('lodash/assign');

module.exports = assign({}, baseConfig, {
	debug: false,
	bail: false,
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
			'API_HOST': JSON.stringify('')
		}),
		new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false,
                dead_code: true,
                screw_ie8: true,
                drop_debugger: true
            }
        }),
        new webpack.NoErrorsPlugin()
	].concat(baseConfig.plugins)
})
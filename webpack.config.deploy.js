/**
 * Created by abaddon on 29.01.2015.
 */
var path = require('path');
var webpack = require('webpack');


module.exports = {
    entry: [
        './src/index.js',
    ],
    output: {
        filename: './dist/index.js',
        sourceMapFilename: './dist/index.map',
        libraryTarget: 'umd',
        library: 'WoolEvent'
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ],
    resolve: {
        extensions: ['', '.js']
    }
};
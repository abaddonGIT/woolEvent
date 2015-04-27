/**
 * Created by abaddon on 29.01.2015.
 */
var path = require('path');
var webpack = require('webpack');


module.exports = {
    entry: [
        './src/',
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js'
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ],
    resolve: {
        extensions: ['', '.js']
    }
};
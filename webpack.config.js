/**
 * Created by abaddon on 29.01.2015.
 */
var webpack = require('webpack'),
    path = require("path");

var webpackConfig = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server',
        "./examples/index"
    ],
    devServer: {
        contentBase: './examples/'
    },
    output: {
        path: path.join(__dirname, 'examples'),
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['', '.js']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.IgnorePlugin(/un~$/)
    ]
};

module.exports = webpackConfig;
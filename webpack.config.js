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
    module: {
        loaders: [
            {test: /\.scss$/, loader: "style-loader!raw-loader!sass-loader"},
            {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
            {test: /\.css$/, loader: "style!css!autoprefixer?browsers=last 2 version"},
            {test: /\.jsx$/, loaders: ['react-hot', 'jsx-loader']},
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'image?optimizationLevel=7&progressive=true&interlaced=true&name=[name]-[hash].[ext]'
            },
            {test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?limit=10000&minetype=application/font-woff"},
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file"}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};

module.exports = webpackConfig;
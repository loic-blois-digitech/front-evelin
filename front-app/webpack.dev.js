const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require("path");

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, "./dist"),
        port: 9000,
        publicPath: "http://localhost:9000/",
        hotOnly: true
    },
});
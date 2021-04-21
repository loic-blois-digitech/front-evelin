    const path = require('path');
    const webpack = require('webpack');
    const polyfill = require("babel-polyfill");
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
        entry: {
            // polyfill permet de résoudre l'erreur: Uncaught ReferenceError: regeneratorRuntime is not defined
            polyfill: "babel-polyfill",
            index: {
                import: path.resolve(__dirname, 'src') + '/index.js',
                dependOn: 'shared',
            },
            shared: 'lodash',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[contenthash].bundle.js',
            clean: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                inject: true,
                template: require('html-webpack-template'),
                bodyHtmlSnippet: '<div id="root"></div>',
                title: 'Evelin - Login',
                favicon: "./src/assets/ico/favicon.ico",
            }),
            // permet de résourdre l'erreur: Uncaught ReferenceError: process is not defined
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
        ],
        module: {
            rules: [
                // chargement de Babel
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    },
                },
                // chargement du CSS
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                // chargement des images et des polices
                {
                    test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|ico)$/,
                    type: 'asset',
                },
            ],
        },
        resolve: {extensions: ["*", ".js", ".jsx"]},
        // permet d'optimiser la taille des fichiers lors de la prod
        optimization: {
            moduleIds: 'deterministic',
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },
    };

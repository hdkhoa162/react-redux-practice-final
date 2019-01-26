// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackDefinePlugin = new webpack.DefinePlugin({
    'process.env': {
        "NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        "APP_NAME": JSON.stringify(process.env.APP_NAME),
        "APP_TITLE": JSON.stringify(process.env.APP_TITLE),
        "APP_VERSION": JSON.stringify(process.env.APP_VERSION),
        "WWW_PORT": JSON.stringify(process.env.WWW_PORT),
        "DATA_API_URL": JSON.stringify(process.env.DATA_API_URL)
    },
    __DEV__: process.env.NODE_ENV !== 'production',
    'process.env.NODE_ENV': process.env.NODE_ENV/*JSON.stringify('development')*/,
    'process.env.APP_VERSION': JSON.stringify(process.env.APP_VERSION),
});
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: './public/index.html',
    inject: true,
    title: process.env.APP_TITLE,
})

module.exports = {
    entry: [
        '@babel/polyfill',
        './src/index.js'
    ],
    output: {
        filename: './bundle.js'
    },
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env'],
                            ['@babel/preset-react', {
                                development: process.env.BABEL_ENV === 'development'
                            }]
                        ]
                    }
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.(s?)css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            // allChunks: true
        }),
        webpackDefinePlugin,
        htmlWebpackPlugin
    ]
};
// chunk, resolve
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js'
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ]
            },
        ]
    },

    mode: 'development',
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html'
    })],
    devServer: {
        port: 8000
    }
};
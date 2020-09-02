const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

let htmlPageNames = ['index', 'payment']; // массив темплейтов

let multipleHtmlPlugins = htmlPageNames.map(name => {
    return new HTMLWebpackPlugin({
        template: `.\\pagetemplates\\${name}.html`,
        filename: `..\\dist\\${name}.html`,
        chunks: ['entry_main', `${name}`] // main - общий js файл
    })
});

module.exports = {
    mode: "development",
    entry: {
        "main": ".\\entry_main.js",
        "index": ".\\entry_index.js",
        "payment": '.\\entry_payment.js'
    },
    output: {
        path: path.resolve(__dirname, "../dist/"),
        filename: "js\\[name].js",
    },
    module: {
        rules: [{
                test: /\\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\\.s[ac]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
    ].concat(multipleHtmlPlugins)
};
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    entry: {
        main: './src/pages/index.js'
    },
    output: {
        path: path.resolve (__dirname, 'dist'),
        filename: 'index.js'
    },
    mode: 'development',
    devServer: {
        static: {
          directory: path.resolve (__dirname, 'dist'),
        }, 
        port: 8080,
        open: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: { importLoaders: 1 }
                  },
                  'postcss-loader'],

            },
            {
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource'
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: '/node_modules/'
              }
        ]
    }


};
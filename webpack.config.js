var path = require('path')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './js/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.bundle.js'
    },
    optimization: {
        splitChunks: {
            cacheGroups:{
                styles: {
                    name: 'styles',
                    test: '/\.css$/',
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            }, {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    }, {
                        loader: 'postcss-loader',
                        options: { sourceMap: true, config: {path: './postcss.config.js'} }
                    }, {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    }, {
                        loader: 'postcss-loader',
                        options: { sourceMap: true, config: {path: './postcss.config.js'} }
                    }
                ]
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, '/build'),
        watchOptions: {
            ignored: /node_modules/
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
        })
    ]
};
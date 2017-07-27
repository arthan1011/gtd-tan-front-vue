let path = require('path');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let HtmlWebpackPlugin  = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/ui"
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.template.ejs',
            inject: 'body',
        }),
    ],
    devServer: {
        contentBase: 'dist',
        port: 4201,
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.s[ca]ss/,
                loader: 'sass-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules')
        ],
        alias: {
            'vue$': 'vue/dist/vue.common.js' // otherwise runtime only vue loaded
        }
    }
};

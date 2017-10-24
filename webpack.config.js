let path = require('path');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let HtmlWebpackPlugin  = require('html-webpack-plugin');

if (isProd()) {
    console.log("Build in production");
} else {
    console.log("Build in development");
}

const rules = [
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
    },
    {
        test: /\.svg$/,
        loader: 'url-loader'
    },
    {
        test: /\.(png|jpg|gif)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    publicPath: "/ui/"
                }
            }
        ]
    }

];

if (isProd()) {
    rules.push({
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['env']
            }
        }
    })
}

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
        port: 4200,
        disableHostCheck: true,
        proxy: {
            "/rest": "http://localhost:3001"
        },
    },
    module: {
        rules: rules
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

function isProd() {
    return process.env.NODE_ENV === 'production'
}
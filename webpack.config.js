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
        test: /\.(png|jpg|svg)$/,
        loader: 'url-loader'
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

        // TODO: А вот тут будет fake back-end
        setup(app) {
            app.get('/api/hello', function(req, res) {
                res.json({ custom: 'hello response' });
            });

            app.get('/rest/task/daily', (req, res) => {
                res.json([
                    {
                        name: "Abstraction",
                        datelineItems: [
                            1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0
                        ],
                    },
                    {
                        name: "Inauguration",
                        datelineItems: [
                            1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0
                        ],
                    },
                    {
                        name: "Polymorphism",
                        datelineItems: [
                            1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0
                        ],
                    }
                ]);
            });
        }
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
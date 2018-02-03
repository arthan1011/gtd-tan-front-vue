/**
 * Created by arthan on 18.07.2017.
 */
const DEFAULT_PORT = 4200;

const express = require('express');
const app = express();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require('../webpack.config.js');

const server = require('./server-config');
const PORT = process.env.PORT || DEFAULT_PORT;
server(app, PORT);

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

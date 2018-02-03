/**
 * Created by arthan on 18.07.2017.
 */

const passedHost = process.argv[2];
const passedPort = process.argv[3];

const PROXY_PORT = passedPort  || 8080;
const PROXY_HOST = passedHost || "backend";

const express = require('express');
const app = express();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require('../webpack.config.js');

const server = require('./server-config');
const PORT = process.env.PORT || 4200;
server(app, PORT, PROXY_HOST, PROXY_PORT);

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

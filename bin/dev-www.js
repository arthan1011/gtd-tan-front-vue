/**
 * Created by arthan on 18.07.2017.
 */
const PORT = 4200;

const express = require('express');
const app = express();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require('../webpack.config.js');

app.set('port', process.env.PORT || PORT);

const compiler = webpack(config);
// app.use('/', express.static('dist'));

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

app.get('/hello', (req, res) => {
    res.send('Hello, expressJs!')
});


app.listen(app.get('port'), () => {
    console.log(`Gtd-tan front end started at port ${app.get('port')}`);
});
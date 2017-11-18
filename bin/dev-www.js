/**
 * Created by arthan on 18.07.2017.
 */
const PORT = 4200;

const express = require('express');
const app = express();
const webpack = require('webpack');
const handlebars = require('express-handlebars');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require('../webpack.config.js');
const setupAuthentication = require('../lib/auth');

app.set('port', process.env.PORT || PORT);
setupAuthentication(app);

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

app.get('/hello', (req, res) => {
    res.send('Hello, expressJs!')
});

// Template
app.engine('handlebars', handlebars({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.get('/login', (req, res) => {
    res.render('login');
});

app.listen(app.get('port'), () => {
    console.log(`Gtd-tan front end started at port ${app.get('port')}`);
});
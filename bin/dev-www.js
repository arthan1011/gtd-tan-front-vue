/**
 * Created by arthan on 18.07.2017.
 */
const PORT = 4200;

const express = require('express');
const URL = require('url');
const proxy = require('express-http-proxy');
const app = express();
const webpack = require('webpack');
const handlebars = require('express-handlebars');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require('../webpack.config.js');
const setupAuthentication = require('../lib/auth');
const api = require('../lib/api');

app.set('port', process.env.PORT || PORT);
setupAuthentication(app);

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

app.use('/public', express.static('public'));

app.use('/api', proxy('localhost:8080', {
    parseReqBody: false,
    proxyReqPathResolver(req) {
        const sourcePath = URL.parse(req.url).path;
        return '/rest' + sourcePath;
    },
    proxyReqOptDecorator(proxyReqOpts, srcReq) {
        proxyReqOpts.headers['AX-GTD-User-ID'] = srcReq.user.id;
        return proxyReqOpts;
    },
    proxyReqBodyDecorator(bodyContent, srcReq) {
        return bodyContent
    }
}));

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
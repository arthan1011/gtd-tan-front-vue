
module.exports = (app, port) => {
    const URL = require('url');
    const setupAuthentication = require('../lib/auth');
    const proxy = require('express-http-proxy');
    const handlebars = require('express-handlebars');
    const express = require('express');

    setupAuthentication(app);

    app.use('/public', express.static('public'));

    app.use('/api', proxy('localhost:8080', {
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

    app.listen(port, () => {
        console.log(`Gtd-tan front end started at port ${port}`);
    });
};

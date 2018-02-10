/**
 * Created by arthan on 18.11.2017.
 */

module.exports = function setupAuthentication(app) {
    const
        passport = require('passport'),
        flash = require('connect-flash'),
        session = require('express-session'),
        bodyParser = require('body-parser'),
        api = require('./api'),
        validateRegistrationData = require('./validation');


    app.use(session({
        secret: "cats",
        resave: false,
        saveUninitialized: false
    }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    /// Authentication configuration
    const LocalStrategy = require('passport-local').Strategy;
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
    passport.use(new LocalStrategy(
        (username, password, done) => {

            // Ask backend server for permission and clientId
            api.post('/user/check', {
                username,
                password
            }).then((res) => {
                const serverResponse = res.data;
                if (serverResponse.success === true) {
                    return done(null, {
                        username: username,
                        password: password,
                        id: serverResponse.clientId
                    });
                } else {
                    return done(null, false, 'Incorrect username or password')
                }
            });
        }));


    const authFilter = (req, res, next) => {
        if (req.originalUrl.startsWith('/public')) {
            next();
            return
        }
        if (req.originalUrl === '/login' || req.originalUrl === '/registration') {
            if (req.isAuthenticated()) {
                res.redirect('/');
            } else {
                next();
            }
        } else {
            if (req.isAuthenticated()) {
                next();
            } else {
                res.redirect('/login');
            }
        }
    };

    const urlRewriteFilter = (req, res, next) => {
        const isApiRequest = req.url.startsWith('/api');
        const isAuthRequest = req.url.startsWith('/login') || req.url.startsWith('/registration') || req.url.startsWith('/logout');
        const isStatic = req.url.startsWith('/public');
        const isWebpackSupport = req.url.endsWith('__webpack_hmr');
        if (!isStaticFile(req.url)
            && !isAuthRequest
            && !isApiRequest
            && !isStatic
            && req.url !== '/'
            && !isWebpackSupport
        ) {
            req.url = '/';
            app.handle(req, res, next);
        } else {
            next();
        }
    };
    app.use(
        '/',
        authFilter,
        urlRewriteFilter
    );

    app.post('/login', function (req, res, next) {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err); // will generate a 500 error
            }
            // Generate a JSON response reflecting authentication status
            if (!user) {
                console.log('Rendering login template with error message');
                return res.render('login', { error: "Incorrect username or password"});
            }

            req.login(user, loginErr => {
                if (loginErr) {
                    return next(loginErr);
                }
                return res.redirect('/');
            });
        })(req, res, next);
    });

    app.post('/registration', (req, res) => {
        console.log('reg: ' + req.originalUrl);
        console.log('body: '+ JSON.stringify(req.body));

        const validationResult = validateRegistrationData(
            req.body.username,
            req.body.password,
            req.body.repeatedPassword
        );
        if (!validationResult.success) {
            return res.json(validationResult);
        }

        const data = {
            username: req.body.username,
            password: req.body.password,
            repeatedPassword: req.body.repeatedPassword
        };
        console.log('data: '+ JSON.stringify(data));
        api.post('/registration', data).then(response => {
            res.json(response.data)
        }, (response) => {
            console.log(response);
        });
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/login');
    });

};

const extensionArray = ['mp3', 'js', 'gif', 'json'];

function isStaticFile(url) {
    return extensionArray.some(ext => url.endsWith(`.${ext}`));
}
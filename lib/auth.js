/**
 * Created by arthan on 18.11.2017.
 */

module.exports = function setupAuthentication(app) {
    const
        passport = require('passport'),
        flash = require('connect-flash'),
        session = require('express-session'),
        bodyParser = require('body-parser'),
        api = require('./api');


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
    app.use(
        '*',
        authFilter
    );

/*    app.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));*/
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
    // app.post('/registration')

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/login');
    });

};

function validateRegistrationData(username, password, repeatedPassword) {

    const errorResult = {};

    if (username.length < 3) {
        errorResult.success = false;
        errorResult.usernameMessage = "Username should be at least 3 symbols long";
    }
    if (password.length < 3) {
        errorResult.success = false;
        errorResult.passwordMessage = "Password should be at least 3 symbols long";
    }
    if (!/\w+/.test(username)) {
        errorResult.success = false;
        errorResult.usernameMessage = "Username contains restricted symbols";
    }
    if (!/\w+/.test(password)) {
        errorResult.success = false;
        errorResult.passwordMessage = "Password contains restricted symbols";
    }
    if (username.length === 0) {
        errorResult.success = false;
        errorResult.usernameMessage = "Username is not specified";
    }
    if (password.length === 0) {
        errorResult.success = false;
        errorResult.passwordMessage = "Password is not specified";
    }
    if (password !== repeatedPassword) {
        errorResult.success = false;
        errorResult.repeatedPasswordMessage = "You should repeat password";
    }

    if (errorResult.success === false) {
        return errorResult;
    }

    return {
        success: true
    }
}
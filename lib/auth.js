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
        if (req.originalUrl === '/login') {
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

    app.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/login');
    });

};
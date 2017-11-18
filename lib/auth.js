/**
 * Created by arthan on 18.11.2017.
 */

module.exports = function setupAuthentication(app) {
    const
        passport = require('passport'),
        flash = require('connect-flash'),
        session = require('express-session'),
        bodyParser = require('body-parser');

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
            if (username !== 'admin') {
                return done(null, false, 'Incorrect username');
            }
            if (password !== 'pass') {
                return done(null, false, 'Incorrect password');
            }
            return done(null, {
                username: 'admin',
                password: 'pass',
                id: 1
            });
        }));


    const authFilter = (req, res, next) => {
        console.log("auth filter " + req.originalUrl);
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
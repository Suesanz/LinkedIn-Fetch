const express = require('express')
    , passport = require('passport')
    , LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
const config = require('./config')
const session = require('express-session')
const path = require('path')
const LINKEDIN_CLIENT_ID = config.client_id;
const LINKEDIN_CLIENT_SECRET = config.client_secret;
let fname = ""
let lname = ""
let emails = ""
let headline = ""
let industry = ""
let summary = ""
let url = ""
passport.serializeUser(function (user, done) {
    fname = user.name.givenName
    lname = user.name.familyName
    url = user._json.pictureUrls.values[0]
    emails = user.emails[0].value
    industry = user._json.industry
    headline = user._json.headline
    summary = user._json.summary
    done(null, user);

});

passport.deserializeUser(function (obj, done) {
    console.log("deserialize id " + obj.id)
    done(null, obj);
});

passport.use(new LinkedinStrategy({
        clientID: LINKEDIN_CLIENT_ID,
        clientSecret: LINKEDIN_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3232/auth/linkedin/callback",
        scope: ['r_basicprofile', 'r_emailaddress'],
        passReqToCallback: true
    },
    function (req, accessToken, refreshToken, profile, done) {
        req.session.accessToken = accessToken;
        process.nextTick(function () {

            return done(null, profile);
        });
    }
));
const app = express();

app.use(session({
    secret: 'some very secret thing',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/linkedin',
    passport.authenticate('linkedin', {state: 'SOME STATE'}),
    function (req, res) {

    });

app.get('/auth/linkedin/callback',
    passport.authenticate('linkedin', {failureRedirect: 'http://localhost:3000'}),
    function (req, res) {
        res.redirect('http://localhost:3000/profile');
    });


app.get('/profile', (req, res) => {

    const customers = [
        {firstName: fname, lastName: lname},
        {Email: emails, headline: headline},
        {industry: industry, summary: summary},
        {url: url}
    ];
    res.json(customers);
});
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(config.PORT);
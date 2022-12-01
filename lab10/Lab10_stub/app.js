// Setup server, session and middleware here.
const express = require('express');
const app = express();
const configRoutes = require('./routes');
const static = express.static(__dirname + '/public');
const session = require('express-session');
const exphbs = require('express-handlebars');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set up render engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// use express session middleware
app.use(
    session({
        name: "AuthCookie",
        secret: "some secret string!",
        resave: false,
        saveUninitialized: true,
    })
);

// Server log
app.use(async (req, res, next) => {
    const timeStamp = new Date().toUTCString();
    const method = req.method;
    const reqRoute = req.originalUrl;
    const userAuthState = req.session.AuthCookie ? true : false;

    console.log('[', timeStamp, ']', ':', method, reqRoute, 'userAuthState: ', userAuthState);

    next();
})

app.get('/protected', async (req, res, next) => {
    if (!req.session.AuthCookie) {
        res.status(403).render('forbiddenAccess');
    }
    else {
        next();
    }

})


configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});
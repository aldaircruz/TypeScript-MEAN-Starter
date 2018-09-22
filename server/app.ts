const express = require('express');
const compression = require('compression');  // compresses requests
const session = require('express-session');
const bodyParser = require('body-parser');
const lusca = require('lusca');
const dotenv = require('dotenv');
const mongo = require('connect-mongo');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
import { MONGODB_URI, SESSION_SECRET } from './util/secrets';

const MongoStore = mongo(session);

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env.example' });

// import * as userController from './controllers/user';
// import * as contactController from './controllers/contact';


// API keys and Passport configuration
import * as passportConfig from './config/passport';

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl, { useMongoClient: true }).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
  console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
  // process.exit();
});

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  store: new MongoStore({
    url: mongoUrl,
    autoReconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (!req.user &&
    req.path !== '/login' &&
    req.path !== '/signup' &&
    !req.path.match(/^\/auth/) &&
    !req.path.match(/\./)) {
    req.session.returnTo = req.path;
  } else if (req.user &&
    req.path === '/account') {
    req.session.returnTo = req.path;
  }
  next();
});

app.use(
  express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
);

/**
 * Primary app routes.
 */
// app.get('/api/', homeController.index);
// app.get('/api/login', userController.getLogin);
// app.post('/api/login', userController.postLogin);
// app.get('/api/logout', userController.logout);
// app.get('/api/forgot', userController.getForgot);
// app.post('/api/forgot', userController.postForgot);
// app.get('/api/reset/:token', userController.getReset);
// app.post('/api/reset/:token', userController.postReset);
// app.get('/api/signup', userController.getSignup);
// app.post('/api/signup', userController.postSignup);
// app.get('/api/contact', contactController.getContact);
// app.post('/api/contact', contactController.postContact);
// app.get('/api/account', passportConfig.isAuthenticated, userController.getAccount);
// app.post('/api/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
// app.post('/api/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
// app.post('/api/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
// app.get('/api/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);

/**
 * OAuth authentication routes. (Sign in)
 */
app.get('/api/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
app.get('/api/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});

export default app;

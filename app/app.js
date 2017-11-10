const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const fs = require('fs');

const passport = require('passport');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const about = require('./about');
const assignments = require('./user/tasks');
const calendar = require('./user/calendar');
const dashboard = require('./user/dashboard');
const login = require('./login');
const index = require('./home/index');
const schedule = require('./user/schedule');
const search = require('./user/search');
const settings = require('./user/settings');
const users = require('./services/users');

const app = express();
console.log("in app.js");

// Block the header from containing information about the server
app.disable('x-powered-by');

// view engine setup
console.log("engine setup");
hbs.registerPartials(__dirname + '/common/partials');
app.set('views', path.join(__dirname, 'common'));
app.set('view engine', 'hbs');
app.set('view options', { layout: '/layouts/main.hbs' });
app.set('models', require(path.join(__dirname,'/db/models')));

/*
  Initialize authentication engine
 */
require('./authentication').init(app); //TODO: Implement Passport for authentication

/*
Session
 */
const db = require(path.join(__dirname,'/db/models'));
const sessionStore = new SequelizeStore({ db: db.sequelize})

app.use(session({
  secret: 'keyboard cat',
  store: sessionStore,
  resave: false, // we support the touch method so per the express-session docs this should be set to false
  proxy: false // if you do SSL outside of node.
}))

sessionStore.sync();

app.use(passport.initialize());
app.use(passport.session());


require('../config/passport.js')(passport, db.user);

console.log("parsers, etc.");
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


console.log("routings and such");
app.use('/about', about);
app.use('/user/tasks', assignments);
app.use('/user/calendar', calendar);
app.use('/user/dashboard', dashboard);
app.use('/', index);
app.use('/user/schedule', schedule);
app.use('/user/search', search);
app.use('/user/settings', settings);
app.use('/user', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render(path.join(__dirname,'errors/error'),{layout: 'layouts/error', title: 'Error'});
});

/*
  Database setup
 */
// const db = require('./config/database');

// db.sequelize.sync({force:false}, function(err){console.log(err);});
//
// db.sequelize.transaction(function(t){
//   return db.user.findOrCreate({
//     where:{
//       id: 'admin'
//     },
//     defaults: {
//       id: 'admin',
//       name: 'Kevin Sarsen' ,
//       email:'kevinsarsen@gmail.com',
//       password: 'admin',
//       createdAt: Date.now(),
//       updatedAt: Date.now()
//     },
//     transaction: t
//   })
//   .spread(function(user, created) {
//     // console.log(user.values)
//     console.log(created)
//   }) //end spread
//   .catch ((e) => {
//     console.log(e.errors)
//   })
// }); // end transaction

// User.findAll().then(function(users) {
//   console.log('Users found: ' + users)
// })

console.log("export app");
module.exports = app;
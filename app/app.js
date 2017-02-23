var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var fs = require('fs');

var about = require('./about');
var assignments = require('./user/tasks');
var calendar = require('./user/calendar');
var dashboard = require('./user/dashboard');
var index = require('./home/index');
var schedule = require('./user/schedule');
var search = require('./user/search');
var settings = require('./user/settings');
var users = require('./services/users');

var app = express();
console.log("in app.js");
// Block the header from containing information
// about the server
app.disable('x-powered-by');

console.log("engine setup");
// view engine setup
hbs.registerPartials(__dirname + '/common/partials');
app.set('views', path.join(__dirname, 'common'));
app.set('view engine', 'hbs');
app.set('view options', { layout: '/layouts/main.hbs' });

console.log("parsers, etc.");
// uncomment after placing your favicon in /public
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
// app.use('/user', users);

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


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
var db = require('./config/database');
app.set('models', require('./common/models'));
console.log("export app");
module.exports = app;
var User = app.get('models').User;
User.findAll().then(function(users) {
  console.log(users)
})

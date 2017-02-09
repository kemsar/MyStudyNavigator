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
hbs.registerPartials(__dirname + '/views/partials');
app.set('views', path.join(__dirname, 'views'));
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
  res.render(path.join(__dirname,'errors/error'));
});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('testDB.db');

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS users (id TEXT, name TEXT, email TEXT, password TEXT)");
  db.run("INSERT INTO users VALUES ('admin', 'Kevin Sarsen', 'kevinsarsen@protonmail.com', 'admin')");
  // var stmt = db.prepare("INSERT INTO users VALUES (?, ?, ?, ?)");
  // for (var i = 0; i < 10; i++) {
  //   stmt.run("Ipsum " + i);
  // }
  // stmt.finalize();
  //
  // db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
  //   console.log(row.id + ": " + row.info);
  // });
});

db.close();

console.log("export app");
module.exports = app;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var fs = require('fs');

var about = require('./routes/about');
var assignments = require('./routes/assignments');
var calendar = require('./routes/calendar');
var dashboard = require('./routes/dashboard');
var index = require('./routes/index');
var schedule = require('./routes/schedule');
var search = require('./routes/search');
var settings = require('./routes/settings');
var users = require('./routes/users');

var app = express();

// Block the header from containing information
// about the server
app.disable('x-powered-by');


// view engine setup
// hbs.registerPartial('partial', fs.readFileSync(__dirname + '/views/partial.hbs', 'utf8'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view options', { layout: '/layouts/main.hbs' });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/about', about);
app.use('/assignments', assignments);
app.use('/calendar', calendar);
app.use('/dashboard', dashboard);
app.use('/', index);
app.use('/schedule', schedule);
app.use('/search', search);
app.use('/settings', settings);
app.use('/users', users);

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
  res.render('error');
});

module.exports = app;

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const index = require('./routes/index');
const exercises = require('./routes/republic/exercises');


const {dbURL} = require('./config');

var app = express();

// Conectando con la BBDD mongo
mongoose.connect(dbURL)
.then(()=> {
  console.log(`Connected to db ${dbURL}`)
})
.catch(e => console.log(e)) 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');
app.use(expressLayouts);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/lib/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/lib/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));


app.use('/', index);
app.use('/republic', exercises);

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

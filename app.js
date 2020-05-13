const createError = require('http-errors');
const express = require('express');
const path = require('path');
const ejs = require('ejs')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const i18n = require('./middleware/i18');
const i18nHelper = require('./middleware/i18-helper');


/* DATABASE */
require('./db');
const {port, database} = require('./config');
console.log(`Your port is: ${port}`);
console.log(`Database name: ${database}`);

/* ROUTES */
const app = express();
const indexRouter = require('./routes/index');
const productsRouter = require('./routes/products');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cookieParser());

app.use(i18n.init);
app.use(i18nHelper);

app.use('/', indexRouter);
app.use('/', productsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
const mongo_store = require("connect-mongo");
const { DBHOST, DBPORT, DBNAME } = require("./config/config");

var accountRouter = require('./routes/web/account');
var createRouter = require('./routes/web/create');
var authRouter = require('./routes/web/auth');
var loginRouter = require('./routes/web/login');
var logoutRouter = require('./routes/web/logout');
var indexRouter = require('./routes/web/index');
const accountRouterAPI = require('./routes/api/account');
const loginRouterAPI = require('./routes/api/login');
var app = express();

app.use(session({
  name: "sid",
  secret: 'jiamizifuchuan',
  saveUninitialized: false,
  resave: true,
  store: mongo_store.create({
    mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`
  }),
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 3600 * 24 * 7 //7天
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/account', accountRouter);
app.use('/create', createRouter);
app.use('/reg', authRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/', indexRouter);
app.use("/api/account", accountRouterAPI);
app.use("/api/login", loginRouterAPI);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.render('404');
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { msg: "error", url: "/account" });
});

module.exports = app;

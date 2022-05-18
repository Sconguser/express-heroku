var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
var fileUpload = require('express-fileupload');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var coolRouter = require('./routes/cool');
var loginRouter = require('./routes/login');
var chatRouter = require('./routes/chat');
var downloadRouter = require('./routes/download');
var app = express();
var http = require('http');



app.use(session({secret: "Shh, its a secret!"}));

// app.use(express.cookieParser());

// set a cookie

// app.locals.ii = meh;
// global.ii = hem;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/users/cool', coolRouter);
app.use('/login', loginRouter);
app.use('/download', downloadRouter);
app.use('/chat', chatRouter)

// catch 404 and forward to error handler


  
// GET request to the root of the app
// app.get("/", function (req, res) {
  
//   // Sending index.html file as response to the client
//   res.sendFile(__dirname + "/index.html");
// });
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var authenticate = require('./authenticate');
var mailer=require('./mailer');
var passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var companyRouter = require('./routes/company');
var candidateRouter= require('./routes/candidate');


/*********DATABASE CONNECTION******* */
const mongoose = require('mongoose');
const connect = mongoose.connect(
  process.env.DB_URI,
  {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    poolSize: 50,
    writeConcern: {wtimeout: 2500} 
  }
);

(async () => {
  try {
      await connect;
      console.log('MongoDB connected!!');
  } catch (err) {
      console.log('Failed to connect to MongoDB', err);
  }
})();

/**************************************** */


var app = express();
//Allowing only secure traffic
app.all('*',(req,res,next)=>{
  if(req.secure){
    return next();
  }
  else {
    res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/admin',adminRouter);
app.use('/company',companyRouter);
app.use('/candidate',candidateRouter);

app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler (route does not exist)
app.use(function(req, res, next) {
  next(createError(404));
});

/**************ERROR HANDLER****************** */

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

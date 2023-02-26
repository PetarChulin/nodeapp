var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');

var registrationRouter = require('./routes/registration-route');
var loginRouter = require('./routes/login-route');
var dashboardRouter = require('./routes/dashboard-route');
var logoutRouter = require('./routes/logout-route');
var indexRouter = require('./routes/index');
const PORT = process.env.PORT || 1330;
var app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ 
  secret: '123456',
  resave: false,
  saveUninitialized: true,
  loggedin: false,
  email: '',
  login: '',
  cookie: { maxAge: 60000 }
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', registrationRouter);
app.use('/', loginRouter);
app.use('/', dashboardRouter);
app.use('/', logoutRouter);
app.use('/', indexRouter);
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))


app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});
app.listen(PORT,()=>{
  console.log('Server is listening on port ',PORT)
})

module.exports = app;

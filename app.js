var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connectToMongo = require('./db');
var cors = require('cors');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const routes = require('./shared/routes');
var app = express();
var bodyParser = require('body-parser');
const CONFIG = require('./config/config');
var winston = require('winston');
const commonResponse = require('./shared/helpers/response');

global._ = require('lodash'); //For Default functionality
global.is_display_log = CONFIG.IS_DISPLAY_LOG || false;
global.logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    winston.format.printf(info => {
      return `${info.timestamp} [${info.level}] : ${info.message}`;
    })
  ),
  defaultMeta: { service: 'user-service'},
  transports: [
    new (winston.transports.File)({
      name: 'file.info',
      filename: path.join(__dirname, 'logs', 'info.log'), //path.join(__dirname  + './logs/info.log'),
      level: 'info'
    }),
    new (winston.transports.File)({
      name: 'file.error',
      filename: path.join(__dirname, 'logs', 'error.log'), //path.join(__dirname  + './logs/error.log'),
      level: 'error'
    })
  ]
})


connectToMongo();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use('/public/images/:folderName/:fileName', async function(req, res) {
  console.log(path.join(__dirname));
  res.sendFile(`${path.join(__dirname)}/public/images/${req.params.folderName}/${req.params.fileName}`);
})

routes.initialize(app);
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(commonResponse.notFound(res, req.languageCode, "Not Found")));
  
});

module.exports = app;

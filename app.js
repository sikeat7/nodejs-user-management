const config = require('./config/config');
const express = require('express');
const stylus = require('stylus');
const nib = require('nib');
const pug = require('pug');
const passport = require('passport');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const logger = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');

const {mongoose} = require('./app/db/mongoose');

const app = express();
const upload = multer({ dest: './uploads' });

// Engine Setup
function compile (str, path) {
    return stylus(str).set('filename', path).use(nib);
}
app.set('views', __dirname + '/resources/views');
app.set('view engine', 'pug');
// app.use(express.logger('dev'));
app.use(stylus.middleware({
    src: __dirname + '/public',
    compile
}));


// Middleware
app.use(express.static(__dirname + '/public'));
// app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser);
app.use(flash());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.JWT_SECRET,
}));
// Passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
// validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
      var namespace = param.split('.'),
          root      = namespace.shift(),
          formParam = root;
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param: formParam,
        msg  : msg,
        value: value
      };
    }
}));

// Routes
const webRoute = require('./routes/web');
const authRoute = require('./routes/auth');
app.use(webRoute);
app.use(authRoute);

// Start up the server
app.listen(process.env.PORT, (err) => {
    if (err) throw err;
    console.log('Server up on port', process.env.PORT);
});
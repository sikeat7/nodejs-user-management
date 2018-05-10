const config = require('./config/config');
const express = require('express');
const path = require('path');
const expressMessages = require('express-messages');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const bcryptjs = require('bcryptjs');
const passport = require('passport');
const logger = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const multer = require('multer');

const app = express();
const upload = multer({ dest: './uploads' });

// Engine Setup
app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + './resources/views/layouts' }));
app.set('views', path.join(__dirname, 'resources/views'));
app.set('view engine', 'hbs');

// Routes
// var webRoute = require('./routes/web');
// app.use(webRoute);
app.get('/', (req, res) => {
    res.render('./index.hbs');
});

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser);
app.use(flash());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.secretKey,
}));
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

// Start up the server
app.listen(config.port, (err) => {
    if (err) throw err;
    console.log('Server up on port', config.port);
});
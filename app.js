const config = require('./config/config');
const express = require('express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const logger = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const handlebars = require('handlebars');
const expressHandlebars = require('express-handlebars');
const multer = require('multer');

const {mongoose} = require('./app/db/mongoose');

const app = express();
const upload = multer({ dest: './uploads' });

// Engine Setup
app.set('views', __dirname + '/resources/views');
const hbs = expressHandlebars({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname+'/resources/views/layouts',
    partialsDir: [
        './resources/views/partials'
    ]
});
app.engine('hbs', hbs);
app.set('view engine', 'hbs');
require('./app/engine/handlebars');

// Middleware
app.use(express.static(__dirname + '/public'));
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
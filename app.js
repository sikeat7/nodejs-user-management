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

// Routes


const app = express();

// Engine Setup
app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + './resources/views/layouts' }));
app.set('views', path.join(__dirname, 'resources/views'));
app.set('view engine', 'hbs');

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser);
// app.use(session({
//     resave: true,
//     saveUninitialized: true,
//     secret: config.secretKey,
// }));

// Routes
const webRoute = require('./routes/web');
app.use(webRoute);

// Start up the server
app.listen(config.port, (err) => {
    if (err) throw err;
    console.log('Server up on port', config.port);
});
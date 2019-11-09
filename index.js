const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const expressValidator = require('express-validator');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('./config/passport');

const routes = require('./routes');
const helpers = require('./helpers');
const db = require('./config/db');
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

db.sync()
    .then(() => console.log('La conexión se ha establecido con éxito.'))
    .catch(err => console.log('No se puede conectar a la base de datos', err));

const app = express();

app.use(express.static('public'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(expressValidator());
app.set('views', path.join(__dirname, './views'));
// Flash messages
app.use(flash());

app.use(cookieParser());
// Sessions
app.use(session({
    secret: 'keyvoard',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// Pasar var_dump a la app
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    next();
});

app.use(routes);

const PORT = 3005;

app.listen(PORT, () => console.log(`API run in: ${PORT}`));
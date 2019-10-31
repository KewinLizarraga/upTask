const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const routes = require('./routes');
const helpers = require('./helpers');
const db = require('./config/db');
require('./models/Proyectos');

db.sync()
    .then(() => console.log('La conexión se ha establecido con éxito.'))
    .catch(err => console.log('No se puede conectar a la base de datos', err));

const app = express();

app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

// Pasar var_dump a la app
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

const PORT = 3000;

app.listen(PORT, () => console.log(`API run in: ${PORT}`));
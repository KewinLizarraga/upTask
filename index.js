const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();

app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

const PORT = 3000;

app.listen(PORT, () => console.log(`API run in: ${PORT}`));
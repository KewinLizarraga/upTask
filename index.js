const express = require('express');

const app = express();

const routes = require('./routes');
// app.use('/', (req, res) => {
//     res.send('Hola')
// })

// app.use('/nosotros', (req, res) => {
//     res.send('Hola')
// })

app.use(routes);

const PORT = 3000;

app.listen(PORT, () => console.log(`API run in: ${PORT}`));
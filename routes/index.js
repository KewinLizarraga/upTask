const express = require('express');
const router = express.Router();

const proyectosController = require('../controllers/proyectosController');

router.get('/', proyectosController.proyectosHome);

router.get('/nosotros', proyectosController.nosotros);

module.exports = router;
const express = require('express');
const router = express.Router();

const { body } = require('express-validator/check');

const proyectosController = require('../controllers/proyectosController');

router.get('/', proyectosController.proyectosHome);
router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
router.post('/nuevo-proyecto',
            body('nombre').not().isEmpty().trim().escape(),
            proyectosController.nuevoProyecto);

module.exports = router;
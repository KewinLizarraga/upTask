const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check');
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');

router.get('/', proyectosController.proyectosHome);
router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
router.post('/nuevo-proyecto',
            body('nombre').not().isEmpty().trim().escape(),
            proyectosController.nuevoProyecto);
router.get('/proyectos/:url', proyectosController.proyectosPorUrl);
router.get('/proyecto/editar/:id', proyectosController.formularioEditar);
router.post('/nuevo-proyecto/:id',
            body('nombre').not().isEmpty().trim().escape(),
            proyectosController.actualizarProyecto);
router.delete('/proyectos/:url', proyectosController.eliminarProyecto);

router.post('/proyectos/:url', tareasController.agregarTarea);
router.patch('/tareas/:id', tareasController.cambiarEstadoTarea);
router.delete('/tareas/:id', tareasController.eliminarTarea);

module.exports = router;
const Proyectos = require('../models/Proyectos');
const slug = require('slug');

module.exports = {
    proyectosHome: (req, res) => {
        res.render('index', {
            nombrePagina: 'Proyectos'
        });
    },
    formularioProyecto: (req, res) => {
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto'
        });
    },
    nuevoProyecto: async (req, res) => {
        const { nombre } = req.body;
        let errores = [];

        if (!nombre) {
            errores.push({ 'texto': 'Agrega un nombre al proyecto' });
        }
        if (errores.length > 0) {
            res.render('nuevoProyecto', {
                nombrePagina: 'Nuevo Proyecto',
                errores
            });
        } else {
            const data = await Proyectos.create({ nombre });
            res.redirect('/');
        }
    }
}
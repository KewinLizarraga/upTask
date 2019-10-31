const Proyectos = require('../models/Proyectos');

module.exports = {
    proyectosHome: async (req, res) => {
        const proyectos = await Proyectos.findAll();
        res.render('index', {
            nombrePagina: 'Proyectos',
            proyectos
        });
    },
    formularioProyecto: async (req, res) => {
        const proyectos = await Proyectos.findAll();

        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            proyectos
        });
    },
    nuevoProyecto: async (req, res) => {
        const proyectos = await Proyectos.findAll();

        const { nombre } = req.body;
        let errores = [];

        if (!nombre) {
            errores.push({ 'texto': 'Agrega un nombre al proyecto' });
        }
        if (errores.length > 0) {
            res.render('nuevoProyecto', {
                nombrePagina: 'Nuevo Proyecto',
                errores,
                proyectos
            });
        } else {
            const data = await Proyectos.create({ nombre });
            res.redirect('/');
        }
    },
    proyectosPorUrl: async (req, res, next) => {
        const proyectos = await Proyectos.findAll();

        const proyecto = await Proyectos.findOne({
            where: {
                url: req.params.url
            }
        });
        console.log(proyecto);

        if (!proyecto) return next();

        // res.send(req.params.url);
        // res.send(proyecto);
        res.render('tareas', {
            nombrePagina: 'Tareas del Proyecto',
            proyecto,
            proyectos
        });
    }
}
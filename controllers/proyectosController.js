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
            await Proyectos.create({ nombre });
            res.redirect('/');
        }
    },
    proyectosPorUrl: async (req, res, next) => {
        const proyectosPromise = Proyectos.findAll();
        const proyectoPromise = Proyectos.findOne({
            where: {
                url: req.params.url
            }
        });
        const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

        if (!proyecto) return next();

        res.render('tareas', {
            nombrePagina: 'Tareas del Proyecto',
            proyecto,
            proyectos
        });
    },
    formularioEditar: async (req, res, next) => {
        const proyectosPromise = Proyectos.findAll();
        const proyectoPromise = Proyectos.findOne({
            where: {
                id: req.params.id
            }
        });
        const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

        // if (!proyecto) return next();

        res.render('nuevoProyecto', {
            nombrePagina: 'Editar Proyecto',
            proyectos,
            proyecto
        })
    },
    actualizarProyecto: async (req, res) => {
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
            await Proyectos.update(
                { nombre: nombre },
                { where: { id: req.params.id } }
            );
            res.redirect('/');
        }
    }
}
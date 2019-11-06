const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

module.exports = {
    agregarTarea: async (req, res, next) => {
        const proyecto = await Proyectos.findOne({ where: { url: req.params.url } });

        const { tarea } = req.body;

        const estado = 0;   // estado 0 = incompleto
        const proyectoId = proyecto.id;

        const resultado = await Tareas.create({ tarea, estado, proyectoId });

        if (!resultado) return next();

        res.redirect(`/proyectos/${req.params.url}`);
    },
    cambiarEstadoTarea: async (req, res, next) => {
        const { id } = req.params;
        const tarea = await Tareas.findOne({where: {id}});
        let estado = 0;

        if (tarea.estado === estado) estado = 1;

        tarea.estado = estado;
        
        const resultado = await tarea.save();

        if (!resultado) return next();

        res.status(200).send('Actualizado')
    }
}
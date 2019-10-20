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
    nuevoProyecto: (req, res) => {
        const { nombre } = req.body;
        let errores = [];

        if (!nombre) {
            errores.push({'texto':'Agrega un nombre al proyecto'});
        }
        if (errores.length > 0) {
            res.render('nuevoProyecto', {
                nombrePagina: 'Nuevo Proyecto',
                errores
            });
        } else {
            // No hay errores
            // Insertar en la DB
        }
    }
}
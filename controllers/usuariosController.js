const Usuarios = require('../models/Usuarios');

module.exports = {
    formCrearCuenta: (req, res) => {
        res.render('crearCuenta', {
            nombrePagina: 'Crear cuenta'
        })
    },
    formIniciarSesion: (req, res) => {
        const { error } = res.locals.mensajes;
        res.render('iniciarSesion', {
            nombrePagina: 'Iniciar sesión',
            error
        })
    },
    crearCuenta: async (req, res) => {
        const { email, password } = req.body;

        try {
            await Usuarios.create({ email, password });
            res.redirect('/iniciar-sesion');
        } catch (error) {
            req.flash('error', error.errors.map(error => error.message));
            res.render('crearCuenta', {
                mensajes: req.flash(),
                nombrePagina: 'Crear cuenta',
                email,
                password
            });
        }
    },
    formReestablecerPassword: (req,res)=>{
        res.render('reestablecer', {
            nombrePagina: 'Reestablecer tu contraseña'
        });
    }
}
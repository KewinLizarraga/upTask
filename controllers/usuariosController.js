const Usuarios = require('../models/Usuarios');
const enviarEmail = require('../handlers/email');

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
            // crear URL para confirmar
            const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;
            // crear el objeto de usuario
            const usuario = { email };
            // enviar Email
            await enviarEmail.enviar({
                usuario,
                subject: 'Confirma tu cuneta UpTask',
                confirmarUrl,
                archivo: 'confirmar-cuenta'
            });
            // redirigir al usuario
            req.flash('correcto', 'Enviamos un correo, confirma tu cuenta');
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
    formReestablecerPassword: (req, res) => {
        res.render('reestablecer', {
            nombrePagina: 'Reestablecer tu contraseña'
        });
    },
    confirmarCuenta: async (req, res) => {
        const usuario = await Usuarios.findOne({ where: { email: req.params.correo } });

        if (!usuario) {
            req.flash('error', 'No valido');
            res.redirect('/crear-cuenta');
        }

        usuario.activo = 1;
        await usuario.save();

        req.flash('correcto', 'Cuenta activada correctamente');
        res.redirect('/iniciar-sesion');
    }
}
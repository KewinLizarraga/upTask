const passport = require('passport');
const crypto = require('crypto');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt');
const Usuarios = require('../models/Usuarios');

module.exports = {
    autenticarUsuario: passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/iniciar-sesion',
        failureFlash: true,
        badRequestMessage: 'Ambos campos son obligatorios'
    }),
    usuarioAutenticado: (req, res, next) => {
        if (req.isAuthenticated()) return next();
        return res.redirect('/iniciar-sesion');
    },
    cerrarSesion: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/iniciar-sesion');
        });
    },
    enviarToken: async (req, res) => {
        const { email } = req.body;
        const usuario = await Usuarios.findOne({ where: { email } });

        if (!usuario) {
            req.flash('error', 'No existe esa cuenta');
            res.redirect('/reestablecer');
        }

        usuario.token = crypto.randomBytes(20).toString('hex');
        usuario.expiracion = Date.now() + 3600000;

        await usuario.save();

        const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;
        console.log(resetUrl);
    },
    validarToken: async (req, res) => {
        const usuario = await Usuarios.findOne({ where: { token: req.params.token } });

        if (!usuario) {
            req.flash('error', 'No válido');
            res.redirect('/reestablecer');
        }

        res.render('resetPassword', {
            nombrePagina: 'Reestablecer contraseña'
        });
    },
    actualizarPassword: async (req, res) => {
        const usuario = await Usuarios.findOne({
            where: {
                token: req.params.token,
                expiracion: {
                    [Op.gte]: Date.now()
                }
            }
        });

        if (!usuario) {
            req.flash('error', 'No válido');
            res.redirect('/reestablecer');
        }

        usuario.password = bcrypt.hashSync(req.body.password, 10);
        usuario.token = null;
        usuario.expiracion = null;

        await usuario.save();

        req.flash('correcto', 'Tu password se ha modificado correctamente');
        res.redirect('/iniciar-sesion');
    }
}
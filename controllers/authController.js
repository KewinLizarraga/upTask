const passport = require('passport');

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
    }
}
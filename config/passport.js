const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Usuarios = require('../models/Usuarios');

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
        try {
            const usuario = await Usuarios.findOne({ where: { email: email } })
            // Usuario existe, password incorrecto
            if (!usuario.verificarPassword(password)) {
                return done(null, false, {
                    message: 'Password incorrecto'
                });
            }
            // Usuario existe, password correcto
            return done(null, usuario)
        } catch (error) {
            // Usuario no existe
            return done(null, false, {
                message: 'Esa cuenta no existe'
            });
        }
    }
));
// Serializar y Deserializar el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});

module.exports = passport;
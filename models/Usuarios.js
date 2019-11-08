const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const Proyectos = require('./Proyectos');

const Usuarios = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            isEmail: { msg: 'Agrega un Email válido.' },
            notEmpty: { msg: 'El email no puede ir vacio' }
        },
        unique: {
            args: true,
            msg: 'Usuario ya registrado'
        }
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'El password no puede ir vacio.' }
        }
    }
}, {
    hooks: {
        beforeCreate(usuario) {
            usuario.password = bcrypt.hashSync(usuario.password, 10);
        }
    }
});

Usuarios.hasMany(Proyectos);

module.exports = Usuarios;
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: '######', // Cambia al puerto de Angular
    credentials: true
}));

app.use(session({
    secret: 'secreto123',
    resave: false,
    saveUninitialized: true
}));

// Configuración de Sequelize
const sequelize = new Sequelize('baseDeDatos', 'usuario', 'password', { // CAMBIAR ESTOS VALORES !!!!! IMPORTANTE !!!!!
    host: 'localhost',
    dialect: 'mysql'
});

// Modelo de usuario
const Usuario = sequelize.define('Usuario', {
    usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'usuarios',
    timestamps: false
});

// Middleware de autenticación
function authMiddleware(req, res, next) {
    if (req.session && req.session.usuario) {
        next();
    } else {
        res.status(401).json({ mensaje: 'No autorizado' });
    }
}

// Ruta de login usando Sequelize
app.post('/login', async (req, res) => {
    const { usuario, password } = req.body;
    try {
        const user = await Usuario.findOne({ where: { usuario, password } });
        if (user) {
            req.session.usuario = usuario;
            res.json({ mensaje: 'Autenticado' });
        } else {
            res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }
    } catch (err) {
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
});

// Ruta protegida
app.get('/protegido', authMiddleware, (req, res) => {
    res.json({ mensaje: 'Bienvenido al área protegida' });
});

// Sincroniza el modelo y arranca el servidor
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a MySQL con Sequelize exitosa.');
        app.listen(3000, () => console.log('Servidor iniciado en http://localhost:3000'));
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
    });
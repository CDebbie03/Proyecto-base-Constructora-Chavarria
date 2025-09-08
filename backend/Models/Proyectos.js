const { DataTypes } = require('sequelize');
const sequelize = require('../Connection/database');

const Proyecto = sequelize.define('proyectos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'proyectos',
    timestamps: true,
});

module.exports = Proyecto;
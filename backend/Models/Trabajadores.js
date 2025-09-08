const { DataTypes, Model } = require('sequelize')
const sequelize = require('../Connection/database')

const Trabajador = sequelize.define('trabajadores',{
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    horas_trabajadas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    proyecto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comentario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
},    
  {
    tableName: 'trabajadores',
    timestamps: true,
  })

  module.exports= Trabajador;





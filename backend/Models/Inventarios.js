const { DataTypes } = require('sequelize')
const sequelize = require('../Connection/database')

const Inventario = sequelize.define('inventario',{
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
    herramienta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    proyecto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
},    
  {
    tableName: 'inventario',
    timestamps: true,
  })

  module.exports= Inventario;
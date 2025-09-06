import { DataTypes, Model } from 'sequelize';
import sequelize from '../Connection/database';
import { ITrabajadores } from './ITrabajadores';

export class Trabajador extends Model<ITrabajadores> implements ITrabajadores {
  public id!: number;
  public nombre!: string;
  public horas_trabajadas!: number;
  public proyecto_id!: number;
  public comentario!: string;
}

// Inicialización del modelo
Trabajador.init(
  {
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
    comentario:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'trabajadores',
    modelName: 'Trabajador',
    timestamps: false,
  }
);

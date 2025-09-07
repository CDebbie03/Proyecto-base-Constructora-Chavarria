import { DataTypes, Model } from "sequelize";
import sequelize from "../Connection/database";
import type { IInventarios } from "./IInventarios";

export class Inventario extends Model<IInventarios> implements IInventarios{
    public id!: number;
    public herramienta!: string;
    public estado!: string;
    public proyecto_id!: number;
}

Inventario.init(
    {
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
        sequelize,
        tableName: 'inventario',
        modelName: 'Inventario',
        timestamps: false,
    }
);
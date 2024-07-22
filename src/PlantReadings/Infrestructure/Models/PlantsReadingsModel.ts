import { Model, DataTypes } from "sequelize";
import sequelize_conexion from "../../../Database/conection";
import IPlantsReading from "../../Domain/IPlantsReading";

export default class PlantReadingModel extends Model<IPlantsReading> implements IPlantsReading {
    id!: string;
    idPlant!: string;
    temperature!: number;
    humidity!: number;
    date!: Date;
}

PlantReadingModel.init({
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },

    idPlant: {
        type: DataTypes.UUID,
        references: {
            model: 'plants',
            key: 'id'
        }
    },

    humidity: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    temperature: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
},{
    tableName: 'plant_readings',
    timestamps: false,
    sequelize: sequelize_conexion
})
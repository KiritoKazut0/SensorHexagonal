import { DataTypes, Model } from "sequelize";
import Stages from "../../Domain/Stages";
import sequelize_conexion from "../../../Database/conection";
import { databaseRelationManager } from "../../../Database/DatabaseRelationManager";

class StagesModel extends Model <Stages> implements Stages {
    id!: string;
    stageName!: string;
    idPlant!: string;
}

StagesModel.init({
    id:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    stageName: {
        type: DataTypes.ENUM,
        values:['germinación', 'vegetativa', 'reproductiva','maduración']
    },
    idPlant:{
        type: DataTypes.UUID,
        references: {
            model: 'plants',
            key: 'id'
        }
    }
},{
    tableName: 'stages',
    timestamps: false,
    sequelize: sequelize_conexion
})

databaseRelationManager.setStagesModel(StagesModel);

export default StagesModel;
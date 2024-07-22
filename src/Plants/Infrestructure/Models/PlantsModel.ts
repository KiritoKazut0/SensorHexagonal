import { DataTypes, Model } from "sequelize";
import Plants from "../../Domain/Plants";
import sequelize_conexion from "../../../Database/conection";
import { databaseRelationManager } from "../../../Database/DatabaseRelationManager";

class PlantsModel extends Model<Plants> implements Plants {
    id!: string;
    userId!: string;
    name!: string;
    plantType!: string;
    
}

PlantsModel.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },

    plantType: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
},{
    tableName: "plants",
    timestamps: false,
    sequelize: sequelize_conexion
});

databaseRelationManager.setPlantsModel(PlantsModel);



 export default PlantsModel;
import { DataTypes, Model} from "sequelize";
import Auth from "../../Domain/Auth";
import sequelize_conexion from "../../../Database/conection";

class UserModel extends Model<Auth> implements Auth {
    id!: string;
    email!: string;
    password!: string;
    name!: string;
}

UserModel.init({
    id: {
       type: DataTypes.UUID,
       allowNull: false,
       primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: "users",
    timestamps: false,
    sequelize: sequelize_conexion
})

export default UserModel
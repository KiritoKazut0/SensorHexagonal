import { Model, ModelStatic } from "sequelize";
import sequelize_conexion from "./conection";
class DatabaseRelationManager<
  UserModel extends Model,
  PlantsModel extends Model,
  PlantsReadingsModel extends Model
> {
  private userModel: ModelStatic<UserModel> | null = null;
  private plantsModel: ModelStatic<PlantsModel> | null = null;
  private plantsReadingsModel: ModelStatic<PlantsReadingsModel> | null = null;

  setUserModel(model: ModelStatic<UserModel>) {
    this.userModel = model;
  }

  setPlantsModel(model: ModelStatic<PlantsModel>) {
    this.plantsModel = model;
  }

  setPlantsReadingsModel(model: ModelStatic<PlantsReadingsModel>) {
    this.plantsReadingsModel = model;
  }

  setupRelacionUser() {
    if (this.userModel && this.plantsModel) {
      this.userModel.hasMany(this.plantsModel, {
        sourceKey: 'id',
        foreignKey: 'userId',
        as: 'plants',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });

      this.plantsModel.belongsTo(this.userModel, {
        foreignKey: 'userId',
        as: 'users'
      });
    } else {
      throw new Error('Hubo un error al relacionar a usuarios');
    }
  }

}

export const databaseRelationManager = new DatabaseRelationManager();


 async function setupRelations() {


    try {
        await sequelize_conexion.sync(); 
        databaseRelationManager.setupRelacionUser();

        console.log("Base de datos sincronizada y relaciones configuradas exitosamente.");
    } catch (error) {
        console.error("Error al configurar la base de datos:", error);
    }
}

(async () => {
  try {
      await setupRelations();
      
  } catch (error) {
      console.error("Error al configurar la base de datos:", error);
  }
})();
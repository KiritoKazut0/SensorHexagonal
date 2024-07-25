import AddUseCase from "../Aplication/AddUseCase";
import DeleteUseCase from "../Aplication/DeleteUseCase";
import GetByPkUseCase from "../Aplication/GetByPkUseCase";
import ListUseCase from "../Aplication/ListUseCase";
import CreateCrontroller from "./Controllers/CreateController";
import DeleteController from "./Controllers/DeleteController";
import GetByPkController from "./Controllers/GetByPkController";
import ListController from "./Controllers/ListController";
import Auth from "./middlewares/Auth";
import PlantsModel from "./Models/PlantsModel";
import MysqlRepository from "./MysqlRepository";
import DecodedToken from "./Service/decodedToken";
import UUIDService from "./Service/UUIDService";
import SendPlantStatsUseCase from "../Aplication/SendPlantStatsUseCase";
import StatsPlantsControllers from "./Controllers/PlantStatsController";
import sequelize_conexion from "../../Database/conection";

export const uuidService = new UUIDService();
export const decodedToken = new DecodedToken();
export const mysqlRepository = new MysqlRepository(PlantsModel, uuidService, sequelize_conexion);

//casos de uso
export const addUseCase = new AddUseCase(mysqlRepository, uuidService);
export const listUseCase = new ListUseCase(mysqlRepository);
export const getByPkCaseUse = new GetByPkUseCase(mysqlRepository);
export const deleteUseCase = new DeleteUseCase(mysqlRepository);
export const sendPlantsUseCase = new SendPlantStatsUseCase(mysqlRepository)

//controllers
export const createController = new CreateCrontroller(addUseCase);
export const listController = new ListController(listUseCase);
export const getByPkController = new GetByPkController(getByPkCaseUse);
export const deleteController = new DeleteController(deleteUseCase);
export const plantsStatsControllers = new StatsPlantsControllers(sendPlantsUseCase)

export const authMiddleware = new Auth(decodedToken)



import AddUseCase from "../Aplication/AdduseCase";
import DeleteUseCase from "../Aplication/DeleteUseCase";
import GetByPkUseCase from "../Aplication/GetByPkUseCase";
import ListUseCase from "../Aplication/ListUseCase";
import UpdateUseCase from "../Aplication/UpdateUseCase";
import CreateCrontroller from "./Controllers/CreateController";
import DeleteController from "./Controllers/DeleteController";
import GetByPkController from "./Controllers/GetByPkController";
import ListController from "./Controllers/ListController";
import UpdateController from "./Controllers/UpdateController";
import Auth from "./Middlewares/Auth";
import StagesModel from "./Models/GrowthStagesModel";
import MysqlRepository from "./MysqlRepository";
import DecodedToken from "./Service/DecodedToken";
import UUIDService from "./Service/UUIDService";

export const uuidService = new UUIDService();
export const decodedToken = new DecodedToken();

export const mysqlRepository = new MysqlRepository(StagesModel, uuidService);

//casos de uso
export const addUseCase = new AddUseCase(mysqlRepository, uuidService);
export const listUseCase = new ListUseCase(mysqlRepository);
export const getByPkCaseUse = new GetByPkUseCase(mysqlRepository);
export const deleteUseCase = new DeleteUseCase(mysqlRepository);
export const updateUseCase = new UpdateUseCase(mysqlRepository);

//controllers
export const createController = new CreateCrontroller(addUseCase);
export const listController = new ListController(listUseCase);
export const getByPkController = new GetByPkController(getByPkCaseUse);
export const deleteController = new DeleteController(deleteUseCase);
export const updateController = new UpdateController(updateUseCase)
export const authMiddleware = new Auth(decodedToken)
import AccessUseCase from "../Aplication/AccessUseCase";
import AddUseCase from "../Aplication/AddUseCase";
import MysqlUserRepository from "./UserMysqlRepository";
import AccessController from "./Controllers/AccessController";
import AddController from "./Controllers/AddControllers";
import EncryptService from "./Helpers/EncryptService";
import TokensService from "./Helpers/TokenService";
import UUIDService from "./Helpers/UUIDService";
import UserModel from "./models/UserModel";

//services
export const encryptService = new EncryptService();
export const uuidService = new UUIDService();
export const tokenService = new TokensService();

export const mysqlUserRepository = new MysqlUserRepository(UserModel, uuidService);

//uses case
export const addUseCase = new AddUseCase(
    mysqlUserRepository,
    encryptService,
    tokenService
)

export const accessUseCase = new AccessUseCase(
    tokenService,
    encryptService,
    mysqlUserRepository
);


//controllers
export const addController = new AddController(addUseCase);
export const accessController = new AccessController(accessUseCase)



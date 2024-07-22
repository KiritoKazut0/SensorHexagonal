import SavePlantReadingUseCase from "../Aplicacion/SavePlantReadingUseCase";
import MysqlRepository from "./MysqlRepository";
import PlantReadingModel from "./Models/PlantsReadingsModel";
import MqttClient from "./Mqtt/MqttClient";
import UUIDInterface from "../Aplicacion/Service/UUIDInterface";
import UUIDService from "./Service/UUIDService";

const uuidService = new UUIDService();

const mysqlRepository = new MysqlRepository(PlantReadingModel, uuidService);
const useCase = new SavePlantReadingUseCase(mysqlRepository, uuidService);

const mqttClient = new MqttClient(useCase);

export default mqttClient;
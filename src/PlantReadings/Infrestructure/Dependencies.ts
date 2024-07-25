import SavePlantReadingUseCase from "../Aplicacion/SavePlantReadingUseCase";
import EmitFanUseCase from "../Aplicacion/EmitFanUseCase";
import EmitLedsUseCase from "../Aplicacion/EmitLedsUseCase";
import EmitWaterPumpUseCase from "../Aplicacion/EmitWaterPumpUseCase";
import EmitLigthUseCase from "../Aplicacion/EmitLigthUseCase";
import MysqlRepository from "./MysqlRepository";
import PlantReadingModel from "./Models/PlantsReadingsModel";
import MqttClient from "./Mqtt/MqttClient";
import UUIDService from "./Service/UUIDService";
import ExternalWebsocketIo from "./SocketIO/SocketIOServer";
import EmitLevelWater from "../Aplicacion/EmitLevelWater";


const uuidService = new UUIDService();
const externalWebsocketIo = new ExternalWebsocketIo();

const mysqlRepository = new MysqlRepository(PlantReadingModel, uuidService);
const useCaseSaveReading = new SavePlantReadingUseCase(mysqlRepository, uuidService, externalWebsocketIo);
const useCaseFan = new EmitFanUseCase(externalWebsocketIo);
const useCaseLeds = new EmitLedsUseCase(externalWebsocketIo);
const useCaseLigt = new EmitLigthUseCase(externalWebsocketIo);
const useCaseWaterPump = new EmitWaterPumpUseCase(externalWebsocketIo)
const useCaseLevelWater = new EmitLevelWater(externalWebsocketIo)


const mqttClient = new MqttClient(
    useCaseSaveReading,
    useCaseLeds,
    useCaseLigt,
    useCaseFan,
    useCaseWaterPump,
    useCaseLevelWater
);

export default mqttClient;
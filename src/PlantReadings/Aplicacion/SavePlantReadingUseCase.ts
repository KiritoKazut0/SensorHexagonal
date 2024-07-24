import PlantReading from "../Domain/PlantsReading";
import PlantReadingRepository from "../Domain/PlantsReadingRepository";
import PlantsReadingRequest from "../Domain/DTOS/PlantsReadingRequest";
import UUIDInterface from "./Service/UUIDInterface";
import WebsocketService  from "../Domain/Socket/WebsocketService";

export default class SavePlantReadingUseCase {
    constructor(
        readonly entryRepository: PlantReadingRepository,
        readonly uuidGenerate: UUIDInterface,
        readonly sockedService: WebsocketService){}

    async run (request: PlantsReadingRequest): Promise <void>{
        
        const plantReading = new PlantReading(
            this.uuidGenerate.generate(),
            request.idPlant,
            request.temperature,
            request.humidity,
            new Date()
        );

        const data = {
            type: 'TemHum',
            data: plantReading
        }

        // await this.entryRepository.save(plantReading)
        
        //enviar los datos a websocket
       await this.sockedService.sendMessage('message', data);
      
    }

}
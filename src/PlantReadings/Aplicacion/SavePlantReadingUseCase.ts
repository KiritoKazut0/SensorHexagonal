import PlantReading from "../Domain/PlantsReading";
import PlantReadingRepository from "../Domain/PlantsReadingRepository";
import PlantsReadingRequest from "../Domain/DTOS/PlantsReadingRequest";
import UUIDInterface from "./Service/UUIDInterface";

export default class SavePlantReadingUseCase {
    constructor(
        readonly entryRepository: PlantReadingRepository,
        readonly uuidGenerate: UUIDInterface){}

    async run (request: PlantsReadingRequest): Promise <void>{
        
        const plantReading = new PlantReading(
            this.uuidGenerate.generate(),
            request.idPlant,
            request.temperature,
            request.humidity,
            new Date()
        );

        await this.entryRepository.save(plantReading)
    }

}
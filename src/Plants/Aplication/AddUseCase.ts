import PlantsRequest from "../Domain/DTOS/PlantsRequest";
import PlantsRepository from "../Domain/PlantsRepository";
import Plants from "../Domain/Plants";
import UUIDInterface from "./Service/UUIDInterface";

export default class AddUseCase {
    constructor( 
        readonly entryRepository: PlantsRepository,
        readonly uuidService: UUIDInterface ){}

    async run (plant: PlantsRequest): Promise <[Plants | null, string]>{
        plant.id = this.uuidService.generate();
        return await this.entryRepository.add(plant)
    }

}
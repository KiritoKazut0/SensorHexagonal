import StagesRequest from "../Domain/DTOS/StagesRequest";
import StagesRepository from "../Domain/StagesRepository";
import Stages from "../Domain/Stages";
import UUIDInterface from "./Service/UUIDInterface";

export default class AddUseCase {
    constructor(
        readonly entryRepository: StagesRepository,
        readonly uuidService: UUIDInterface
    ){}

    async run (stage: StagesRequest): Promise <[Stages | null, string]>{
        stage.id = this.uuidService.generate();
        return await this.entryRepository.add(stage)
    }

}
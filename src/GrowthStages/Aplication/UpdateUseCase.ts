import StagesUpdate from "../Domain/DTOS/StagesUpdateRequest";
import StagesRepository from "../Domain/StagesRepository";
import Stages from "../Domain/Stages";

export default class UpdateUseCase {
    constructor(readonly entryRepository: StagesRepository){}

    async run (stage: StagesUpdate): Promise<[Stages | null | undefined,string ]> {
        return await this.entryRepository.update(stage)
    }

}
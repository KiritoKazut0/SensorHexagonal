import Stages from "../Domain/Stages";
import StagesRepository from "../Domain/StagesRepository";

export default class GetByPkUseCase {
    constructor(readonly entryRepository: StagesRepository){}

    async run (pk: string): Promise <[Stages | null | undefined, string]>{
        return await this.entryRepository.getPk(pk);
    }

}
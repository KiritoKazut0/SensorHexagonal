import PlantsRepository from "../Domain/PlantsRepository";
import Plants from "../Domain/Plants";

export default class GetByPkUseCase {
    constructor (readonly entryRepository: PlantsRepository){}

    async run (pk:string): Promise <[Plants | null | undefined, string]>{
        return await this.entryRepository.getByPk(pk)
    }
    
}
import PlantsRepository from "../Domain/PlantsRepository";

export default class DeleteUseCase {
    constructor (readonly entryRepository: PlantsRepository){}

    async run (pk:string): Promise<[null| undefined, string]>{
        return await this.entryRepository.delete(pk);
    }

}
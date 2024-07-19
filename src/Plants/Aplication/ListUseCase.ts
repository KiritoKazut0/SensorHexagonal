import Plants from "../Domain/Plants";
import PlantsRepository from "../Domain/PlantsRepository";

export default class ListUseCase {
    constructor (readonly entryRepository: PlantsRepository){}

    async run (): Promise <[Plants[] | null, string]> {
        return await this.entryRepository.list()
    }

}
import SendPlantStats from "../Domain/DTOS/sendPlantStats";
import PlantsRepository from "../Domain/PlantsRepository";

export default class SendPlantStatsUseCase {

    constructor(readonly entryRepository: PlantsRepository){}

    async getPlantsStats(pk: string): Promise<[SendPlantStats | null | undefined, string]>{
        return await this.entryRepository.StatsPlant(pk)
    }


}
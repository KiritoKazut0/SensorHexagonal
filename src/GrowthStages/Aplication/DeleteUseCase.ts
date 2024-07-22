import StagesRepository from "../Domain/StagesRepository";

export default class DeleteUseCase {
    constructor(readonly entryRepository: StagesRepository){}

    async run(pk: string): Promise<[null | undefined, string]>{
        return await this.entryRepository.delete(pk);
    }


}
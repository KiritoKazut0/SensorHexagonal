import Stages from "../Domain/Stages";
import StagesRepository from "../Domain/StagesRepository";

export default class ListUseCase {
    constructor (readonly entryRepository: StagesRepository){}

    async run ():Promise <[Stages[] | null,string]>{
        return await this.entryRepository.list();
    }    


}
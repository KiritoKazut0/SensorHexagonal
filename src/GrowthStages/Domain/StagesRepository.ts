import Stages from "./Stages";
import StagesRequest from "./DTOS/StagesRequest";
import StagesUpdate from "./DTOS/StagesUpdateRequest";

export default interface StagesRepository {
    list():Promise <[Stages[] | null, string]>;
    getPk(pk: string): Promise<[Stages | null |undefined, string]>;
    add(stages: StagesRequest): Promise <[Stages | null, string]>;
    delete(pk:string): Promise<[null | undefined, string]>
    update(stage: StagesUpdate): Promise<[Stages | null | undefined, string]>
}
import Plants from "./Plants";
import PlantsRequest from "./DTOS/PlantsRequest";

export default interface PlantsRepository {
    list(): Promise<[Plants[] | null, string]>;
    getByPk(pk: string): Promise<[Plants | null | undefined, string]>;
    add(plant: PlantsRequest): Promise<[Plants | null, string]>;
    delete(pk: string): Promise<[null | undefined, string]>;
}
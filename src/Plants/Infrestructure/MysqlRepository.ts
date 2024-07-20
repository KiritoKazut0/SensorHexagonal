import PlantsRequest from "../Domain/DTOS/PlantsRequest";
import Plants from "../Domain/Plants";
import PlantsRepository from "../Domain/PlantsRepository";
import PlantsModel from "./Models/PlantsModel";
import UUIDInterface from "../Aplication/Service/UUIDInterface";

export default class MysqlRepository implements PlantsRepository {
    constructor(
        readonly plantsModel: typeof PlantsModel,
        readonly generateUuid: UUIDInterface) { 
            this.plantsModel.sync()
        }
    //typeOF es para indicarle que se usara metodos estaticoc y que no se esta instanciando como una clase
    // y que se esta haciendo una referecnia al modelo

    async add(plant: PlantsRequest): Promise<[Plants | null, string]> {
        try {

            const newPlant = await this.plantsModel.create({
                id: this.generateUuid.generate(),
                userId: plant.userId,
                name: plant.name,
                plantType: plant.plantType
            });

            return [newPlant, "Se creo correctamente"]

        } catch (error) {
            console.log(error)
            return [null, 'Ha ocurrido un error durante la peticion']
        }
    }

    async list(): Promise<[Plants[] | null, string]> {
        try {
            const response = await this.plantsModel.findAll()
            return [response, 'se realizo correctamente la cosulta']
        } catch (error) {
            console.error(error);
            return [null, 'Ah acurrido un error durante la peticion']
        }
    }

    async getByPk(pk: string): Promise<[Plants | null | undefined, string]> {
        try {
            const plant = await this.plantsModel.findByPk(pk);
            if (plant === null) {
                return [undefined, 'No se ah encontrado una planta con esa id']
            }

            return [plant, 'Se realizo correctamente la consulta']

        } catch (error) {
            console.log(error);
            return [null, 'Hubo un error al realizar la consulta']
        }
    }

    async delete(pk: string): Promise<[null | undefined, string]> {
        try {
            const plant = await this.plantsModel.findByPk(pk)
            if(plant === null){
                return [null, 'el elemento que desea eliminar no existe']
            }

            await plant.destroy();
            return [undefined, 'Se elimino correctamente la planta']
        } catch (error) {
            console.log(error);
            return [null, 'Hubo un error en la consulta']
        }
    }

}
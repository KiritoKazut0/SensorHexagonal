import StagesRequest from "../Domain/DTOS/StagesRequest";
import Stages from "../Domain/Stages";
import StagesRepository from "../Domain/StagesRepository";
import StagesModel from "./Models/GrowthStagesModel";
import UUIDInterface from "../Aplication/Service/UUIDInterface";
import StagesUpdate from "../Domain/DTOS/StagesUpdateRequest";

export default class MysqlRepository implements StagesRepository {
    constructor(
        readonly stagesModel: typeof StagesModel,
        readonly generateUuid: UUIDInterface
    ) {
        this.stagesModel.sync()
    }

    async add(stages: StagesRequest): Promise<[Stages | null, string]> {
        try {
            const newStage = await this.stagesModel.create({
                id: this.generateUuid.generate(),
                stageName: stages.stageName,
                idPlant: stages.idPlant
            });

            return [newStage, 'Se creo correctamente']

        } catch (error) {
            console.error(error);
            return [null, 'Ha ocurrido un error durante la peticion']
        }
    }


    async list(): Promise<[Stages[] | null, string]> {
        try {
            const response = await this.stagesModel.findAll();
            return [response, 'Se realizo correctamente la consulta']

        } catch (error) {
            console.error(error);
            return [null, 'Ha ocurrido un error durante la peticion']
        }
    }

    async getPk(pk: string): Promise<[Stages | null | undefined, string]> {
        try {
            const stage = await this.stagesModel.findByPk(pk);

            if (stage === null) {
                return [undefined, 'No se ah encontrado una planta con esa id']
            }

            return [stage, 'Se realizo correctamente la consulta']

        } catch (error) {
            console.error(error)
            return [null, 'Ha ocurrido un error durante la peticion']
        }
    }

    async delete(pk: string): Promise<[null | undefined, string]> {
        try {
            const stage = await this.stagesModel.findByPk(pk);
            if (stage === null) {
                return [null, 'el elemento que desea eliminar no existe']
            }

            await stage.destroy();
            return [undefined, 'Se elimino correctamente la stage']

        } catch (error) {
            console.error(error)
            return [null, 'Hubo un error en la consulta']
        }
    }

    async update(stage: StagesUpdate): Promise<[Stages | null | undefined, string]> {
        try {
            const pk = stage.id;
            if (!pk) return [null, "Asegurate de mandar la id de la etapa de la planta"];

            const stagesShearch = await this.stagesModel.findByPk(pk)

            if (stagesShearch === null) return [undefined, "La Etapa que desea actualizar no existe."];

            stagesShearch.set({
                stageName: stage.stageName === undefined ? stagesShearch.stageName: stage.stageName
            });

            await stagesShearch.save();
            return [stagesShearch, "Planta actualizada con éxito."];
        } catch (error) {
            console.error(error)
            return [null, "Hubo un error en la consulta"];
        }
    }

}
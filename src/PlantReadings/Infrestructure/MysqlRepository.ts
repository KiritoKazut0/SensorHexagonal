import PlantReading from "../Domain/PlantsReading";
import PlantReadingRepository from "../Domain/PlantsReadingRepository";
import PlantsReadingRequest from "../Domain/DTOS/PlantsReadingRequest";
import PlantReadingModel from "./Models/PlantsReadingsModel";
import UUIDInterface from "../Aplicacion/Service/UUIDInterface";
import IPlantsReading from "../Domain/IPlantsReading";

export default class MysqlRepository implements PlantReadingRepository {
    constructor(
        readonly plantsReadingModel: typeof PlantReadingModel,
        readonly generateUuid: UUIDInterface
    ) { 
        this.plantsReadingModel.sync();
    }

   async save(plantsReading: PlantReading): Promise<IPlantsReading | null | undefined> {
    try {

        if (plantsReading.id === null) return null

        const dataSave = await this.plantsReadingModel.create({
            id: plantsReading.id,
            idPlant: plantsReading.idPlant,
            temperature: plantsReading.temperature,
            humidity: plantsReading.humidity,
            date: plantsReading.date
        })

        return dataSave

    } catch (error) {
        console.log('error al guardar la lectura de la planta')
        console.error(error)
    }
   }

}
import PlantsRequest from "../Domain/DTOS/PlantsRequest";
import Plants from "../Domain/Plants";
import PlantsRepository from "../Domain/PlantsRepository";
import PlantsModel from "./Models/PlantsModel";
import UUIDInterface from "../Aplication/Service/UUIDInterface";
import SendPlantStats from "../Domain/DTOS/sendPlantStats";
import { Sequelize, QueryTypes } from "sequelize";


export default class MysqlRepository implements PlantsRepository {
    constructor(
        readonly plantsModel: typeof PlantsModel,
        readonly generateUuid: UUIDInterface,
        readonly sequelize: Sequelize) {

        this.plantsModel.sync();
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
            if (plant === null) {
                return [null, 'el elemento que desea eliminar no existe']
            }

            await plant.destroy();
            return [undefined, 'Se elimino correctamente la planta']
        } catch (error) {
            console.log(error);
            return [null, 'Hubo un error en la consulta']
        }
    }

    async StatsPlant(pk: string): Promise<[SendPlantStats | null | undefined, string]> {
        try {
            const query = `
             SELECT 
                idPlant,
                AVG(temperature) AS averageTemperature,
                AVG(humidity) AS averageHumidity,
                MAX(date) AS latestDate,
                COUNT(*) AS count
                FROM plant_readings
                WHERE idPlant = 'a9fc1553-0ac3-4b66-ae95-2cb9abd06051'
                AND temperature BETWEEN -50 AND 50
                AND humidity BETWEEN 0 AND 100
                GROUP BY idPlant;
           `;

            const results: any[] = await this.sequelize.query(query, {
                type: QueryTypes.SELECT
            });

            console.log('Query results:', results);

            if (results.length === 0) {
                return [undefined, 'No se encontraron datos para el identificador de planta especificado'];
            }

            const result = results[0];
            console.log('Raw averageTemperature:', result.averageTemperature);
            console.log('Raw averageHumidity:', result.averageHumidity);

            const latestDate = new Date(result.latestDate);
            const currentDate = new Date();
            const hours = String(currentDate.getHours()).padStart(2, '0');
            const minutes = String(currentDate.getMinutes()).padStart(2, '0');
            const timeString = `${hours}:${minutes}`;
   


            const StatsPlant: SendPlantStats = {
                idPlant: pk,
                averageTemperature: parseFloat(result.averageTemperature.toFixed(2)),
                averageHumidity: parseFloat(result.averageHumidity.toFixed(2)),
                time: timeString,
                date: latestDate.toLocaleDateString('es-MX', { timeZone: 'America/Mexico_City' })
            };

            return [StatsPlant, `Se realizó correctamente la consulta. Registros encontrados: ${result.count}`];
        } catch (error) {
            console.error('Error en StatsPlant:', error);
            return [null, 'Hubo un error en la consulta'];
        }
    }









}
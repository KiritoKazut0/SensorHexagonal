
export default class PlantReading {
    constructor(
       readonly id: string | null,
       readonly idPlant: string,
       readonly temperature: number,
       readonly humidity: number,
       readonly date: Date
    ){}
}
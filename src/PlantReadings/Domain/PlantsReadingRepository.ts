import PlantReading from "./PlantsReading";
import IPlantsReading from "./IPlantsReading";
export default interface PlantReadingRepository {
    save(plantsReading: PlantReading): Promise <IPlantsReading | null | undefined>
}
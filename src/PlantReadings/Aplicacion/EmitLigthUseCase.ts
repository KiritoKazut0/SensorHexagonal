import WebsocketService from "../Domain/Socket/WebsocketService";
import LightSensorRequest from "../Domain/DTOS/LigthSensorRequest";

export default class EmitLigthUseCase {
    constructor (readonly sockedService: WebsocketService){}

    async run (request: LightSensorRequest): Promise <void> {

        const data = {
            type: "ligth",
            LightSensor: request
        }

        await this.sockedService.sendMessage('message', data);
    }
}
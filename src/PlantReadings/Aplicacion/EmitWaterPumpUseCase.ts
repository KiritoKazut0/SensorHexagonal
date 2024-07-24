import WebsocketService from "../Domain/Socket/WebsocketService";
import WaterPumpRequest from "../Domain/DTOS/WaterPumpRequest";

export default class EmitWaterPumpUseCase {
    constructor(readonly sockedService: WebsocketService){}

    async run(request: WaterPumpRequest): Promise<void>{
        const data = {
            type: 'watherPump',
            bomba: request
        }

        this.sockedService.sendMessage('message', data)
    }

}
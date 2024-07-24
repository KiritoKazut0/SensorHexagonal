import WebsocketService from "../Domain/Socket/WebsocketService";
import LedsRequeste from "../Domain/DTOS/LedsRequest";

export default class EmitLedsUseCase {
    constructor(readonly sockedService: WebsocketService){}

    async run (request: LedsRequeste): Promise<void>{
        const data = {
            type: 'Leds',
            data: request
        }

        await this.sockedService.sendMessage('message', data)
    }

}

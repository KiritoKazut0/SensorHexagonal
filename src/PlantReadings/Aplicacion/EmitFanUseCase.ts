import WebsocketService from "../Domain/Socket/WebsocketService";
import FanRequest from "../Domain/DTOS/FanRequest";

export default class EmitFanUseCase {
    constructor(readonly sockedService: WebsocketService){}
    
   async run (request: FanRequest): Promise <void> {
    const data = {
        type: 'Fan',
        FanOn: request
    }

    this.sockedService.sendMessage('message', data)
   }

}
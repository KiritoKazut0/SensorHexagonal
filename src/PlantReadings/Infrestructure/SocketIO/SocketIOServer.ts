import { Socket, io } from "socket.io-client";
import WebsocketService from "../../Domain/Socket/WebsocketService";

export default class ExternalWebsocketIo implements WebsocketService {
    private socket: Socket;

    constructor(url: string){
        this.socket = io(url);

        this.socket.on('connect',() => {
            console.log('Conectado al servidor Socket.IO externo');
        });

        this.socket.on('disconnect', () => {
            console.log('Desconectado del servidor Socket.IO externo');
          });

    }

    async sendMessage(event: string, data: any): Promise<void> {
        return new Promise ((resolve, reject) => {
            this.socket.emit(event, data, (error: any) => {
                if(error) {
                    reject(error);
                } else{
                    resolve();
                }
            })
        })
    }


}
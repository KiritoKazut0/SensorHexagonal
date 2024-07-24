import { Socket, io } from "socket.io-client";
import WebsocketService from "../../Domain/Socket/WebsocketService";
import dotenv from "dotenv"

dotenv.config();
export default class ExternalWebsocketIo implements WebsocketService {
    private socket: Socket;

    constructor(){
        this.socket = io(process.env['SERVER_WEBSOCKET'] ?? "", {
            extraHeaders: {
                'authorization': process.env['KEY_WEBSOCKET']?.toString() ?? "default"
            }
        });

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
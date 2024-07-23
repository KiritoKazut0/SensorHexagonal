export default interface WebsocketService {
    sendMessage(event: string, data: any): Promise<void>
}
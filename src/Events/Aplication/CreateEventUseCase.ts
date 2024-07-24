import Event from "../Domain/Event";
import EventRequest from "../Domain/DTOS/EventRequest";
import MqttPublisherInterface from "./Service/MqttPublisherInterface";
import dotenv from "dotenv"

dotenv.config();

export default class CreateEventUseCase {
    constructor(
        readonly mqttPublisher: MqttPublisherInterface
    ){}

    async run (request: EventRequest): Promise<Event> {
        const evento = new Event(
            request.If,
            request.Uv,
            request.visible
        )

        const send = {
            led1:request.If,
            led2: request.Uv,
            led3: request.visible
        }

        await this.mqttPublisher.publish(
            process.env['PUBLISS_LEDS'] || 'sensor/leds', JSON.stringify(send)
        );

        return evento;
    }

}
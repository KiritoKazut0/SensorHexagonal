import mqtt from "mqtt";
import MqttPublisherInterface from "../../Aplication/Service/MqttPublisherInterface";

export default class MqttPublisher implements MqttPublisherInterface {
    private client: mqtt.MqttClient;

    constructor(brokerUrl: string) {
        this.client = mqtt.connect(brokerUrl);

        this.client.on('connect', () => {
            console.log('Conectado al servidor Mqtt');

        });

        this.client.on('error', (error) => {
            console.log(error);

        })

    }

    publish(topic: string, message: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.publish(topic, message, (error) => {
                if (error) {
                    reject(error)
                } else {
                    console.log(`Mensaje publicado en ${topic}: ${message}`);
                    resolve();
                }
            })
        })
    }



}
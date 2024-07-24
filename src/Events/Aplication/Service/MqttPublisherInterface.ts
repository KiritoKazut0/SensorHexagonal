
export default interface MqttPublisherInterface {
    publish(topic: string, message: string): Promise<void>;
}
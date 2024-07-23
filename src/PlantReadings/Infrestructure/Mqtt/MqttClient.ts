import mqtt from "mqtt";
import SavePlantReadingUseCase from "../../Aplicacion/SavePlantReadingUseCase";
import dotenv from "dotenv"

dotenv.config();

export default class MqttClient {
    private client: mqtt.MqttClient;
    private brokerUrl: string = process.env['BROKER'] || 'mqtt://34.197.63.247/:1883'
    private topic:string = process.env['TOPIC'] || 'sensor/Tem-Hum';

    constructor(private savePlantReadingUseCase: SavePlantReadingUseCase) {
      this.client = mqtt.connect(this.brokerUrl); 
  
      this.client.on('connect', () => {
        console.log('Conectado al broker MQTT');

        this.client.subscribe(this.topic, (error) => {
            if(!error){
                console.log(`Suscrito al tema ${this.topic}`)
            } else{
                console.error(error)
            }
        });

      });
  
      this.client.on('message', this.handleMessage.bind(this));
      this.client.on('error', (error) => {
        console.log(error);
      });

      this.client.on('close', () => {
        console.log('Conexión cerrada');
        
      })
    }
  
    private async handleMessage(topic: string, message: Buffer) {
      //example: /plants/readings/idPlant
      
      // const topicParts = topic.split('/');

      // if (topicParts[0] === 'plant' && topicParts[1] === 'readings') {
      //   const plantId = topicParts[2];
      //   const data = JSON.parse(message.toString());
  
      //   try {
      //   //   await this.savePlantReadingUseCase.run({
      //   //     idPlant: plantId,
      //   //     temperature: data.temperature,
      //   //     humidity: data.humidity
      //   //   });
      //   //   console.log(`Lectura guardada para la planta ${plantId}`);
      //       console.log({data})
      //   } catch (error) {
      //     console.error('Error al guardar la lectura de la planta:', error);
      //   }
      // }
      console.log(`Mensaje recibido del tema`);
      const {temperatura, humedad} = JSON.parse(message.toString());
          console.log({
              temperatura,
              humedad
          });

          try {
            console.log(`Lectura guardada y enviada al WebSocket`);
            await this.savePlantReadingUseCase.run({
              idPlant: '',
              humidity: humedad,
              temperature: temperatura
            })

          } catch (error) {
            console.error('Error al guardar y enviar la lectura de la planta:', error);
          }
    }
  }
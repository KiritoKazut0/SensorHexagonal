import mqtt from "mqtt";
import SavePlantReadingUseCase from "../../Aplicacion/SavePlantReadingUseCase";
import EmitLedsUseCase from "../../Aplicacion/EmitLedsUseCase";
import EmitLigthUseCase from "../../Aplicacion/EmitLigthUseCase";
import EmitWaterPumpUseCase from "../../Aplicacion/EmitWaterPumpUseCase";
import EmitFanUseCase from "../../Aplicacion/EmitFanUseCase";
import dotenv from "dotenv"

dotenv.config();

export default class MqttClient {
  private client: mqtt.MqttClient;
  private brokerUrl: string = process.env['BROKER'] || 'mqtt://34.197.63.247/:1883'
  private topicTemHum: string = process.env['TEMHUM'] || 'sensor/Tem-Hum';
  private topicVentilador: string = process.env['VENTILADOR'] || 'sensor/Fan';
  private topicligth: string = process.env['LIGTH'] || 'sensor/LightSensor';
  private topicLeds: string = process.env['LEDS'] || 'sensor/leds'
  private topicBomba: string = process.env['BOMBA'] || 'sensor/bomba'

  constructor(
    private savePlantReadingUseCase: SavePlantReadingUseCase,
    private ledsUseCase: EmitLedsUseCase,
    private ligtUseCase: EmitLigthUseCase,
    private fanUseCase: EmitFanUseCase,
    private waterPumpUseCase: EmitWaterPumpUseCase
  ) {


    this.client = mqtt.connect(this.brokerUrl);
    this.client.on('connect', () => {
      console.log('Conectado al broker MQTT');
      //suscripcion de la temperatura y humedada
      this.client.subscribe(
        [this.topicTemHum, this.topicVentilador, this.topicligth, this.topicLeds, this.topicBomba],
        (error) => {
          if (!error) {
            console.log(`Suscrito al tema a los 5 temas`)
          } else {
            console.error(error)
          }
        });
    });


    this.client.on('message', (topic, message) => {
      
      switch (topic) {
        case this.topicTemHum:
          this.saveTemHumDb(topic, message)
          break;

        case this.topicligth:
          this.sendMessageLigth(topic, message)
          break;

        case this.topicLeds:
          this.sendMessageLeds(topic, message)
          break;

          case this.topicBomba:
          this.sendMessageLBomba(topic, message)
          break

          case this.topicVentilador:
            this.SendMessageVentilador(topic, message)
            break;

        default:
          break;
      }
    });

    this.client.on('error', (error) => { console.log(error); });
    this.client.on('close', () => { console.log('Conexión cerrada'); });

  }

  private async saveTemHumDb(topic: string, message: Buffer) {

     const { temperatura, humedad } = JSON.parse(message.toString());
     try {
       await this.savePlantReadingUseCase.run({
         idPlant: '',
         humidity: humedad,
         temperature: temperatura
       });

     } catch (error) {
       console.error('Error al guardar y enviar la lectura de la planta:', error);
     }
  }

  private async sendMessageLigth(topic: string, message: Buffer) {
    const {LightSensor} = JSON.parse(message.toString())
    await this.ligtUseCase.run(LightSensor)
  }

  private async sendMessageLeds(topic: string, message: Buffer){
    //aun no funciona
    console.log(JSON.parse(message.toString()))
  }

  private async SendMessageVentilador(topic: string, message: Buffer) {
    const {FanOn} = JSON.parse(message.toString());
    await this.fanUseCase.run(FanOn);

  }

  private async sendMessageLBomba(topic: string, message: Buffer) {
    console.log(JSON.parse(message.toString()))
    //aun no funcuiona
  }

}
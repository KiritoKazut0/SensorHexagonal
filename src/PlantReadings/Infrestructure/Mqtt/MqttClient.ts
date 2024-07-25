import mqtt from "mqtt";
import SavePlantReadingUseCase from "../../Aplicacion/SavePlantReadingUseCase";
import EmitLedsUseCase from "../../Aplicacion/EmitLedsUseCase";
import EmitLigthUseCase from "../../Aplicacion/EmitLigthUseCase";
import EmitWaterPumpUseCase from "../../Aplicacion/EmitWaterPumpUseCase";
import EmitFanUseCase from "../../Aplicacion/EmitFanUseCase";
import EmitLevelWater from "../../Aplicacion/EmitLevelWater";
import dotenv from "dotenv"

dotenv.config();

export default class MqttClient {
  private client: mqtt.MqttClient;
  private brokerUrl: string = process.env['BROKER'] || 'mqtt://34.197.63.247/:1883'
  private topicTemHum: string = process.env['TEMHUM'] || 'sensor/Tem-Hum';
  private topicVentilador: string = process.env['VENTILADOR'] || 'sensor/Fan';
  private topicligth: string = process.env['LIGTH'] || 'sensor/LightSensor';
  private topicLeds: string = process.env['LEDS'] || 'sensor/ledsReturn';
  private topicBomba: string = process.env['BOMBA'] || 'sensor/bomba';
  private topiclevelWater: string = process.env[''] || 'sensor/WaterLevel'

  constructor(
    private savePlantReadingUseCase: SavePlantReadingUseCase,
    private ledsUseCase: EmitLedsUseCase,
    private ligtUseCase: EmitLigthUseCase,
    private fanUseCase: EmitFanUseCase,
    private waterPumpUseCase: EmitWaterPumpUseCase,
    private levelWaterUseCase: EmitLevelWater
  ) {


    this.client = mqtt.connect(this.brokerUrl);
    this.client.on('connect', () => {
      console.log('Conectado al broker MQTT');
      //suscripcion de la temperatura y humedada
      this.client.subscribe(
        [this.topicTemHum, this.topicVentilador, this.topicligth, this.topicLeds, this.topicBomba, this.topiclevelWater],
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

          case this.topiclevelWater:
              this.sendMessageLevelWater(topic, message)
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
    const { LightSensor } = JSON.parse(message.toString())
    await this.ligtUseCase.run(LightSensor)
  }

  private async sendMessageLeds(topic: string, message: Buffer) {
    const {visible, UV, IF} = JSON.parse(message.toString());
     await this.ledsUseCase.run({visible, UV, IF});
  }

  private async SendMessageVentilador(topic: string, message: Buffer) {
    const { FanOn } = JSON.parse(message.toString());
    await this.fanUseCase.run(FanOn);

  }

  private async sendMessageLBomba(topic: string, message: Buffer) {
    const { bomba } = JSON.parse(message.toString());
    await  this.waterPumpUseCase.run(bomba);
  }

  private async sendMessageLevelWater (topic: string, message: Buffer) {
    const {WaterLevel} =JSON.parse(message.toString())
    await this.levelWaterUseCase.run(WaterLevel)
  }

}
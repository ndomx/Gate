import { Injectable } from "@nestjs/common";
import { connect } from 'mqtt';

@Injectable()
export class MqttService {
    private client = connect(process.env.MQTT_SERVER_URL)

    constructor() {
        this.client.on('connect', () => {
            console.log('connected to mqtt server')
            /** subscribe to topic for debug purposes */
            this.client.subscribe('home/main', (err) => {
                if (err) {
                    console.log('unable to subscribe')
                }
            })
        })
        
        this.client.on('message', (topic, message) => {
            console.log(`${topic}: ${message}`)
        })
    }

    open(topic: string) {
        this.client.publish(topic, 'open');
    }
}
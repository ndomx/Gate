import { Injectable } from "@nestjs/common";
import { MqttClient } from "mqtt/types/lib/client";
import * as mqtt from 'mqtt';

const MQTT_SERVER_URL = 'mqtt://broker.emqx.io'
const devices = {
    home1: [
        {
            name: 'device1',
            gateId: 'gate1'
        }
    ]
}

const client: MqttClient = mqtt.connect(MQTT_SERVER_URL);
client.on('connect', () => {
    console.log('connected to mqtt server')
    client.subscribe('home1/device1', (err) => {
        if (err) {
            console.log('unable to subscribe')
        }
    })
})

client.on('message', (topic, message) => {
    console.log(`${topic}: ${message}`)
})

@Injectable()
export class MqttService {

    open(gateId: string) {
        Object.keys(devices).forEach((key) => {
            const home: Array<any> = devices[key]
            const device = home.find((dev) => dev.gateId === gateId)
            if (device) {
                const topic = `${key}/${device.name}`
                client.publish(topic, 'open')
            }
        })
    }

    #getTopicList(): string[] {
        let topics: string[] = []
        Object.entries(devices).forEach((entry) => {
            const key = entry[0];
            const devices = entry[1];
            topics = topics.concat(devices.map((deviceId) => `${key}/${deviceId}`))
        })

        return topics
    }
}
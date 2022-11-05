import { Injectable } from "@nestjs/common";
import { OpenGateRequestDto } from "src/dtos/open-gate-request.dto";
import { OperationResult } from "src/dtos/open-gate-response.dto";
import { MqttService } from "./mqtt.service";

const gates = [
    {
        gateId: 'gate1',
        allowedDevices: [
            'device1', 'device2'
        ]
    }
]

@Injectable()
export class GatesService {
    constructor(private readonly mqttService: MqttService) {}

    async requestAccess(request: OpenGateRequestDto): Promise<OperationResult> {
        if (!this.#isAllowed(request.gateId, request.deviceId)) {
            return 'access-denied';
        }

        this.#grantAccess(request.gateId);

        return 'access-granted';
    }

    #isAllowed(gateId: string, deviceId: string): boolean {
        const gate = gates.find((g) => g.gateId === gateId)
        if (!gate) {
            return false;
        }

        return gate.allowedDevices.includes(deviceId);
    }

    #grantAccess(gateId: string) {
        this.mqttService.open(gateId);
    }
}
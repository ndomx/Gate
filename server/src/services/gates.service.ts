import { Injectable } from "@nestjs/common";
import { OpenGateRequestDto } from "src/dtos/open-gate-request.dto";

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
    async requestAccess(request: OpenGateRequestDto): Promise<boolean> {
        console.log(request)
        if (!this.#isAllowed(request.gateId, request.deviceId)) {
            return false;
        }

        this.#grantAccess(request.gateId);

        return true;
    }

    #isAllowed(gateId: string, deviceId: string): boolean {
        const gate = gates.find((g) => g.gateId === gateId)
        if (!gate) {
            return false;
        }

        return gate.allowedDevices.includes(deviceId);
    }

    #grantAccess(gateId: string) {

    }
}
import { Body, Controller, Post } from "@nestjs/common";
import { OpenGateRequestDto } from "src/dtos/open-gate-request.dto";
import { OpenGateResponseDto } from "src/dtos/open-gate-response.dto";
import { GatesService } from "src/services/gates.service";

@Controller("gates")
export class GatesController {
    constructor(private readonly gatesService: GatesService) { }

    @Post()
    async openGate(@Body() request: OpenGateRequestDto): Promise<OpenGateResponseDto> {
        return request;
    }
}
import { Body, Controller, Post } from "@nestjs/common";
import { OpenGateRequestDto } from "src/dtos/open-gate-request.dto";
import { OpenGateResponseDto } from "src/dtos/open-gate-response.dto";

@Controller("gates")
export class GateController {
    @Post()
    async openGate(@Body() request: OpenGateRequestDto): Promise<OpenGateResponseDto> {
        return {
            success: true
        }
    }
}
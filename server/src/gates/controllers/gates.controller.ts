import { Body, Controller, Post } from '@nestjs/common';
import { OpenGateRequestDto } from '../dtos/open-gate-request.dto';
import { OpenGateResponseDto } from '../dtos/open-gate-response.dto';
import { GatesService } from '../services/gates.service';

@Controller('gates')
export class GatesController {
  constructor(private readonly gatesService: GatesService) {}

  @Post()
  async openGate(
    @Body() request: OpenGateRequestDto,
  ): Promise<OpenGateResponseDto> {
    const result = await this.gatesService.requestAccess(request);
    return { ...request, result };
  }
}

import {
  Body,
  Controller,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OpenGateRequestDto } from '../dtos/open-gate-request.dto';
import { OpenGateResponseDto } from '../dtos/open-gate-response.dto';
import { GatesService } from '../services/gates.service';

@Controller()
@UsePipes(new ValidationPipe({ transform: true }))
export class GatesController {
  constructor(private readonly gatesService: GatesService) {}

  @Put()
  async openGate(
    @Body() request: OpenGateRequestDto,
  ): Promise<OpenGateResponseDto> {
    const result = await this.gatesService.requestAccess(request);
    return result;
  }
}

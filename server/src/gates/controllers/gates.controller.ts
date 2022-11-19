import {
  Body,
  Controller,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OpenGateRequestDto } from '../dtos/request/open-gate-request.dto';
import { OpenGateResponseDto } from '../dtos/response/open-gate-response.dto';
import { GatesService } from '../services/gates.service';

@Controller('gates')
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

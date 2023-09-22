import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RootsCrudService } from '../services/roots-crud.service';
import { CreateRootRequestDto } from '../dtos/requests';
import { RootResponseDto } from '../dtos/responses';
import { UpdateRootRequestDto } from '../dtos/requests/update-root-request.dto';
import { JwtAdminAuthGuard } from 'src/auth/guards/jwt-admin-auth.guard';

@Controller('roots')
@UseGuards(JwtAdminAuthGuard)
export class RootsController {
  constructor(private readonly rootsCrudService: RootsCrudService) {}

  @Post()
  create(@Body() request: CreateRootRequestDto): Promise<RootResponseDto> {
    return this.rootsCrudService.create(request);
  }

  @Get(':id')
  findById(@Param('id') rootId: string): Promise<RootResponseDto> {
    return this.rootsCrudService.findById(rootId);
  }

  @Patch(':id')
  update(
    @Param('id') rootId: string,
    @Body() request: UpdateRootRequestDto,
  ): Promise<RootResponseDto> {
    return this.rootsCrudService.update(rootId, request);
  }

  @Delete(':id')
  delete(@Param('id') rootId: string): Promise<RootResponseDto> {
    return this.rootsCrudService.delete(rootId);
  }
}

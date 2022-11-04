import { Module } from '@nestjs/common';
import { GatesController } from './controllers/gates.controller';
import { GatesService } from './services/gates.service';

@Module({
  imports: [],
  controllers: [GatesController],
  providers: [GatesService],
})
export class AppModule {}

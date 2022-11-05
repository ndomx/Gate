import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GatesController } from './controllers/gates.controller';
import { GatesService } from './services/gates.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [GatesController],
  providers: [GatesService],
})
export class AppModule { }

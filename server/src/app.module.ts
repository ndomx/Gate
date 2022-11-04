import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { GateController } from './controllers/gate.controller';
import { AppService } from './services/app.service';

@Module({
  imports: [],
  controllers: [AppController, GateController],
  providers: [AppService],
})
export class AppModule {}

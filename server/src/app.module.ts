import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { GatesModule } from './gates/gates.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    GatesModule,
    RouterModule.register([
      {
        path: 'gates',
        module: GatesModule,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

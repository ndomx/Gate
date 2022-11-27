import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GatesModule } from './gates/gates.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    GatesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

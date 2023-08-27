import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const defaultPort = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = +process.env.PORT || defaultPort;

  await app.listen(port, () => {
    const logger = new Logger();
    logger.log(`Listening to port ${port}`, 'GateApp');
  });
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import config from './config/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {

  //  Microservice Redis Protocol
  const redis = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.REDIS
    ,options:{
      url:'redis://localhost:6379',
    }
  });
  redis.listen(() => console.log('Fee-Microservice is listening'));

  // // Web Service
  const app = await NestFactory.create(AppModule);
  app.enableCors();


  const options = new DocumentBuilder()
    .setTitle('Payment Api')
    .setDescription('The payment API description')
    .setVersion('1.0')
    .addTag('payment')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger/fee', app, document);
  await app.listen(config.PORT);
}
bootstrap();

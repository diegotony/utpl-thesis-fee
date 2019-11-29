import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import config from './config/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
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

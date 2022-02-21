import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    { logger: ['error', 'warn', 'log'] }
  );
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({transform: true}))
  app.enableCors();
  
  const options = new DocumentBuilder()
    .setTitle('Cajas API')
    .setDescription('Esta es la documentación de la API para el sistema de cajas')
    .setVersion('1.0')
    .addTag('cajas')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc-api', app, document);

  await app.listen(3000);
}
bootstrap();

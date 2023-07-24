import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Doc')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('İşNet')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // auto-validation ValidationPipe
  // error message kapatmak için default 400 code
  /* new ValidationPipe({
    disableErrorMessages: true,
  })
  */
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

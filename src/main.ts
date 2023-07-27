import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { RolesGuard } from './auth/guards/role.guard';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);



  const config = new DocumentBuilder()
    .setTitle('API Doc')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('İşNet')
    .addBearerAuth({ // önemli swagger bu olmadan header üzerinden gönderilen accessToken bilgisini okumuyor
      description: `Jwt Token`,
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header'
    }, 'access-token') // Bearer Authentication
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
  app.useGlobalGuards(); // uygulama genelinde tüm guardları aktif et
  app.enableCors(); // cors ayarlarını aktif ettik.
  app.use(helmet()); // saldırılara karşı koruma altına almak için kullandığımız bir paket
  await app.listen(3000);
}
bootstrap();

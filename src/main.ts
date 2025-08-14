import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const theme = new SwaggerTheme();

  const config = new DocumentBuilder()
    .setTitle("")
    .setDescription("")
    .setContact("", "", "")
    .setVersion("1.0")
    .addBearerAuth()
    .build()

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const theme = new SwaggerTheme();


  const config = new DocumentBuilder()
    .setTitle('🛡️ BlinTech by DevDivs')
    .setDescription('Seguro para eletrônicos')
    .setContact(
      'DevDivs',
      'https://github.com/DevDivs-Turma-JavaScript-08',
      'devdivs.genbr@gmail.com',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app, config);

    const options = {
      customSiteTitle: "BlinTech", 
      customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK_MONOKAI),
      customfavIcon: "/src/assets/Imagem_do_WhatsApp_de_2025-08-14_as_16.32.57_425d0342.jpg",
      swaggerOptions: {
        docExpansion: 'none'
      }
    };

    SwaggerModule.setup("/swagger", app, document, options);

    process.env.TZ = "-03:00";

    app.useGlobalPipes(new ValidationPipe());

    app.enableCors();

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();

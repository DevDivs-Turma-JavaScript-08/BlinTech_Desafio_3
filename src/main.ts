import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const theme = new SwaggerTheme();


  const config = new DocumentBuilder()
    .setTitle("BlinTech by DevDivs")
    .setDescription("Seguro para eletrônicos")
    .setContact("DevDivs", "https://github.com/DevDivs-Turma-JavaScript-08", "devdivs.genbr@gmail.com")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app, config);

    const options = {
      customSiteTitle: "BlinTech", 
      customCss: theme.getBuffer(swaggerthemenameenum.DARK_MONOKAI)
    };

    SwaggerModule.setup("/swagger", app, document, options)

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();

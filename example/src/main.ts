import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configSwagger } from './swagger.config';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);

  SwaggerModule.setup('api', app, configSwagger(app), {
    customSiteTitle: 'Package Example',
  });
  await app.listen(PORT);
  console.log(`server is running on http://127.0.0.1:${PORT}`);
}
bootstrap();

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import info, { version } from '../../../package.json';
// import build from '../../build-date.json';

export const configSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('fuck')
    .setVersion('version')
    .setDescription('oh fuck')
    .addTag('lol fuck')
    .build();
  return SwaggerModule.createDocument(app, options);
};

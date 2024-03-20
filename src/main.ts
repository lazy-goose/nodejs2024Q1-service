import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs/promises';
import * as yaml from 'yaml';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  const port = Number(configService.get('PORT'));

  const openApiFile = await fs.readFile('doc/api.yaml');
  SwaggerModule.setup('doc', app, yaml.parse(openApiFile.toString()));

  await app.listen(port);
}
bootstrap();

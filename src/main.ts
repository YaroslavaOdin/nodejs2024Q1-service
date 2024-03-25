import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import * as yaml from 'js-yaml';

dotenv.config();

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = yaml.load(
    await readFile('./doc/api.yaml', { encoding: 'utf8' }),
  ) as OpenAPIObject;
  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT, () => {
    console.log(`The server is running at the address localhost:${PORT}.`);
  });
}
bootstrap();

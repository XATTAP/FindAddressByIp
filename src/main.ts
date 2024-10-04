import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';

const globalPipesOptions: ValidationPipeOptions = {
  whitelist: true,
  exceptionFactory: (validationErrors: ValidationError[] = []) => {
    const formattedErrors = validationErrors.map((error) => ({
      [error.property]: error.constraints,
    }));
    return new BadRequestException(formattedErrors);
  },
};

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);
  app.useGlobalPipes(new ValidationPipe(globalPipesOptions));

  await app.listen(process.env.SERVER_PORT || 3000);
  const url = await app.getUrl();
  console.log(`server start on ${url}`);
}
bootstrap();

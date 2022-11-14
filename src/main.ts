import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const PORT = process.env.WEBSERVER_PORT || 5000;
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();

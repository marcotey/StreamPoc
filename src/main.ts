import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExemploStream } from './exemploStream';
import { BaseStorage } from '@bitcapital/kz-base-storage';
import { StorageService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const storageService = new StorageService(null);
  const exe = new ExemploStream(storageService);
  exe.processStatement(null);
  //await app.listen(3000);
}
bootstrap().catch(() => process.exit(1));

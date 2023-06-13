import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { StorageService } from './app.service';
import { BaseStorage } from '@bitcapital/kz-base-storage';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    StorageService,
    {
      provide: BaseStorage,
      inject: [],
      useFactory: async () => {
        let storage;

        return (storage = {
          endpoint: 'string',
          port: 'number',
          useSSL: 'boolean',
          accessKey: 'string',
          secretKey: 'string',
          bucket: 'string',
          region: 'string',
        });
      },
    },
  ],
})
export class AppModule {}

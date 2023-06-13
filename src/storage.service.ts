import { BaseStorage } from '@bitcapital/kz-base-storage';
import { Injectable, Logger } from '@nestjs/common';
import { IStorageService } from './storage.service.interface';
import { Readable } from 'stream';

@Injectable()
export class StorageService implements IStorageService {
  private readonly logger = new Logger(StorageService.name);

  constructor(private storageService: BaseStorage) {}
  getFile(fileName: string, format?: string): Promise<Readable> {
    throw new Error('Method not implemented.');
  }

  public async save(
    fileName: string,
    file: string | Buffer,
    format?: string,
  ): Promise<void> {
    this.logger.debug(`Saving file: ${fileName}`);

    await this.storageService.saveFile({ id: fileName }, file, {
      extension: format || 'csv',
    });
  }

  public async *saveAsStream(
    file: Readable,
  ): AsyncGenerator<any, void, unknown> {
    const fileName = 'Current-Day';
    const format = 'csv';
    this.logger.debug(`Saving file: ${fileName}`);
    console.log(`[saveAsStream]: ${JSON.stringify(file)}`);
    for await (const stream of file) {
      await this.storageService.saveFile({ id: fileName }, stream, {
        extension: format || 'csv',
      });

      this.logger.debug(`chunk was sucessfully saved: ${file}`);
      yield file;
    }
  }
}

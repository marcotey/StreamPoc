import { BaseStorage } from '@bitcapital/kz-base-storage';
import { Injectable } from '@nestjs/common';
import { IStorageService } from './storage.service.interface';
import { Readable } from 'stream';

@Injectable()
export class StorageService implements IStorageService {
  constructor(private storageService: BaseStorage) {}
  getFile(fileName: string, format?: string): Promise<Readable> {
    throw new Error('Method not implemented.');
  }

  public async save(
    fileName: string,
    file: string | Buffer,
    format?: string,
  ): Promise<void> {
    await this.storageService.saveFile({ id: fileName }, file, {
      extension: format || 'csv',
    });
  }

  public async *saveAsStream(
    file: Readable,
  ): AsyncGenerator<any, void, unknown> {
    const fileName = 'Current-Day';
    const format = 'csv';

    console.log(`[saveAsStream]: ${JSON.stringify(file)}`);
    for await (const stream of file) {
      await this.storageService.saveFile({ id: fileName }, stream, {
        extension: format || 'csv',
      });

      yield file;
    }
  }
}

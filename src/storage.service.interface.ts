import { Readable } from 'stream';

export interface IStorageService {
  getFile(fileName: string, format?: string): Promise<Readable>;
  save(fileName: string, file: string | Buffer, format?: string): Promise<void>;
  saveAsStream(file: Readable): AsyncGenerator<any, void, unknown>;
}

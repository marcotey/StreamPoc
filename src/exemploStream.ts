/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { IStorageService } from './storage.service.interface';

import { pipeline } from 'stream/promises';

import { Readable } from 'stream';

interface IStatementRequest {
  seq_num: string;
  operation_id: string;
  amount: string;
  created_at: Date;
  settled_at: Date;
  balance_after: string;
  transaction_id: string;
  operation_type: string;
  operation_process: string;
  account_id: string;
  account_type: string;
  account_label: string;
  entry_label: string;
  balance_type: string;
  entry_order: number;
  currency_code: string;
  count: string;
  total_income: string;
  total_expense: string;
  initial_balance: string;
  end_balance: string;
}

export class ExemploStream {
  constructor(private storageService: IStorageService) {}

  public async processStatement(request: IStatementRequest) {
    try {
      console.log('entrou');
      const statement = [
        {
          seq_num: '16668482',
          operation_id: 'c9620be1-a49d-44d1-bad4-542046377b46',
          amount: '-503.5300000',
          created_at: '2022-06-06T02:59:58.739Z',
          settled_at: '2022-06-06T02:59:58.739Z',
          balance_after: '-20037300.1500000',
          transaction_id: '4ad1dcf7-ef20-4655-8c0b-e7752d07deaa',
          operation_type: 'pix_in',
          operation_process: 'execution',
          account_id: '4fe4a49b-fa36-4bac-8b81-e25ef9bbe802',
          account_type: 'asset',
          account_label: 'spi_active_account',
          entry_label: 'main_value',
          balance_type: 'available',
          entry_order: 1,
          currency_code: 'BRL',
          count: '916198',
          total_income: '57612502.6700000',
          total_expense: '-70664422.1400000',
          initial_balance: '-20036796.6200000',
          end_balance: '-6985750.6800000',
        },
        {
          seq_num: '16668482',
          operation_id: 'c9620be1-a49d-44d1-bad4-542046377b46',
          amount: '-503.5300000',
          created_at: '2022-06-06T02:59:58.739Z',
          settled_at: '2022-06-06T02:59:58.739Z',
          balance_after: '-20037300.1500000',
          transaction_id: '4ad1dcf7-ef20-4655-8c0b-e7752d07deaa',
          operation_type: 'pix_in',
          operation_process: 'execution',
          account_id: '4fe4a49b-fa36-4bac-8b81-e25ef9bbe802',
          account_type: 'asset',
          account_label: 'spi_active_account',
          entry_label: 'main_value',
          balance_type: 'available',
          entry_order: 1,
          currency_code: 'BRL',
          count: '916198',
          total_income: '57612502.6700000',
          total_expense: '-70664422.1400000',
          initial_balance: '-20036796.6200000',
          end_balance: '-6985750.6800000',
        },
      ];

      const statementStream = Readable.from(statement);

      await pipeline(
        statementStream,
        this.mapFunction,
        this.saveStorageStream, // da erro de undefined caso chame storageservice lá dentro
        this.storageService.saveAsStream.bind(this), // assim nãõ da erro de undefined mas passa objeto vazio rpa frente e da erro la dentro
      );
    } catch (error) {
      throw new Error(error as string);
    }
  }

  public async *mapFunction(chunk) {
    for await (const data of chunk) {
      //data.setEncoding('utf8');

      console.log('[mapFunction]', data);
      yield data;
      /*const statement = {
        seqNum: data.seq_num,
        createdAt: data.created_at,
        transactionId: data.transaction_id,
        transactionStatementName: transactionStatementName(
          data.operation_type,
          data.operation_process,
        ),
        currencyCode: data.currency_code,
        amount: parseCsvCurrency(data.amount),
        balanceAfter: parseCsvCurrency(data.balance_after),
        accountId: data.account_id,
      };

      yield {
        statements: statement,
        count: '0',
        total_income: data.total_income || '0',
        total_expense: data.total_expense || '0',
        initial_balance: data.initial_balance || '0',
        end_balance: data.end_balance || '0',
      };*/
    }
  }

  public async *saveStorageStream(chunk) {
    for await (const data of chunk) {
      console.log('[saveStorageStream]', data);
      //await this.storageService.saveAsStream(data); //erro de undefined

      yield data;

      //yield this.storageService.saveAsStream.bind(data); //erro de undefined
    }
  }

  public async *outPut(stream) {
    for await (const data of stream) {
      console.log('[outPut]', data);
      //this.storageService.saveAsStream(data);

      yield JSON.stringify(data) + '\n';
    }
  }
}

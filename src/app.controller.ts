import { Controller, Get } from '@nestjs/common';
import { StorageService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: StorageService) {}

  @Get()
  getHello(): string {
    return ''; //this.appService.getHello();
  }
}

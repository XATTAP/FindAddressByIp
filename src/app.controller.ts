import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { QueryIp } from './dtos/app.dto';
import { IpResponse } from './interfaces/app.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getIp(@Query() query: QueryIp): IpResponse {
    return this.appService.getIp(query.ip);
  }
}

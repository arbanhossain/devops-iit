import { Controller, Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class DashboardService {
  constructor() { }

  submitInfo(info: any) {
    console.log(info);
  }
}
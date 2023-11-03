import { Controller, Get } from '@nestjs/common';
@Controller('dashboard')
export class DashboardController {
  constructor() {}

  @Get()
  root() : string {
    return "Main Dashboard";
  }

}
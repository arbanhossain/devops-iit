import { Controller, Get } from '@nestjs/common';
import connection from '../db/db';

@Controller('dashboard')
export class DashboardController {
  constructor() {}

  @Get()
  root() : string {
    return "Main Dashboard";
  }

  @Get('db-test')
  async dbTest() : Promise<any> {
    let res = await connection.promise().query('select * from users');
    let [rows, fields, ...rest] = res;
    return rows;
  }

}
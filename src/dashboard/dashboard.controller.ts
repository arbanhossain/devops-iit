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
    let res = await connection.execute('select * from users', [1])
    // let [rows, fields, ...rest] = res;
    return res.rows;
  }

}
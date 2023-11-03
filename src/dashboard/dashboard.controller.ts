import { Controller, Get, Post, Body } from '@nestjs/common';
import connection from '../db/db';
import { DashboardService } from './dashboard.service';
import { SubmissionDto } from './dto/SubmissionDto';
import { InfoRequestDto } from './dto/InfoRequestDto';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashService: DashboardService) {}

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

  @Post('submit-info')
  submitInfo(@Body() info: SubmissionDto): any {
    this.dashService.submitInfo(info);
  }

  @Get('get-info')
  getInfo(@Body() cred: InfoRequestDto) : any {
    return this.dashService.getInfo(cred.token, cred.id);
  }

}
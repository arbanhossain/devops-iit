import { Controller, Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';

import connection from '../db/db';
import { SubmissionDto } from './dto/SubmissionDto';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class DashboardService {
  constructor(private authService: AuthService) { }

  async submitInfo(info: SubmissionDto) {
    if (!this.authService.isValidToken(info.token, info.id)) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    try {
      await connection.execute('INSERT INTO taxes (id, year, income, tax) VALUES (?, ?, ?, ?)',
        [info.id, info.year, info.income, info.tax]);
      return {
        statusCode: 200,
        message: 'Info submitted'
      }
    } catch (error) {
      throw new HttpException(`Error submitting info: ${error.toString()}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getInfo(token: string, id: string) {
    if (!this.authService.isValidToken(token, id)) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    try {
      let res = await connection.execute('SELECT * FROM taxes WHERE id = ?', [id]);
      return res.rows;
    } catch (error) {
      throw new HttpException(`Error getting info: ${error.toString()}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
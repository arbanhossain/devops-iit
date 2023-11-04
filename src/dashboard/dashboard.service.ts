import { Controller, Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';

import connection from '../db/db';
import { SubmissionDto } from './dto/SubmissionDto';

import { AuthService } from '../auth/auth.service';

import * as Sentry from "@sentry/node";

@Injectable()
export class DashboardService {
  constructor(private authService: AuthService) { }

  async submitInfo(info: SubmissionDto) {
    if (!this.authService.isValidToken(info.token, info.id)) {
      Sentry.captureMessage('Invalid token signature');
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    try {
      const transaction = Sentry.startTransaction({op: "submitInfo", name: "Submit Tax Info"});
      await connection.execute('INSERT INTO taxes (id, year, income, tax) VALUES (?, ?, ?, ?)',
        [info.id, info.year, info.income, info.tax]);
      transaction.finish();
      return {
        statusCode: 200,
        message: 'Info submitted'
      }
    } catch (error) {
      Sentry.captureException(error)
      throw new HttpException(`Error submitting info: ${error.toString()}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getInfo(token: string, id: string) {
    if (!this.authService.isValidToken(token, id)) {
      Sentry.captureMessage('Invalid token signature');
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    try {
      const transaction = Sentry.startTransaction({
        op: "getInfo",
        name: "Get Tax Info",
      });
      let res = await connection.execute('SELECT * FROM taxes WHERE id = ?', [id]);
      transaction.finish();
      return res.rows;
    } catch (error) {
      Sentry.captureException(error)
      throw new HttpException(`Error getting info: ${error.toString()}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
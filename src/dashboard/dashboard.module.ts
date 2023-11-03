import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { AuthService } from '../auth/auth.service';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, AuthService],
  exports: [DashboardService]
})

export class DashboardModule { }
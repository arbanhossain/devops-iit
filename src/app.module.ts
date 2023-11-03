
import { Module } from '@nestjs/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';
import { WizardModule } from './wizard/wizard.module';

@Module({
  imports: [DashboardModule, AuthModule, WizardModule],
})

export class AppModule {}

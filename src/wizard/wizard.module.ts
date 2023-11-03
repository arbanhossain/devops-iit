import { Module } from '@nestjs/common';
import { WizardController } from './wizard.controller';
import { WizardService } from './wizard.service';

@Module({
  controllers: [WizardController],
  providers: [WizardService],
  exports: [WizardService]
})

export class WizardModule {}
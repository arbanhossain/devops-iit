import { Test, TestingModule } from '@nestjs/testing';
import { WizardController } from '../wizard/wizard.controller';
import { WizardService } from '../wizard/wizard.service';

describe('WizardController', () => {
  let wizardControl: WizardController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WizardController],
      providers: [WizardService],
    }).compile();

    wizardControl = app.get<WizardController>(WizardController);
  });


  describe('root', () => {
    it('should return TaxWizard Calculator', () => {
      expect(wizardControl.root()).toBe('TaxWizard Calculator');
    })
  })
})
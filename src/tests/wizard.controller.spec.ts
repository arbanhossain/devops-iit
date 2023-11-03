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
    });
  })

  describe('calculate', () => {
    it('should return 72500', () => {
      expect(wizardControl.calculate({
        "income": 1000000,
        "date": new Date(),
        "gender": "M",
        "age": 34,
        "location": "SYLHET"
      })).toEqual({
        "statusCode": 200,
        "tax": 72500
      });
    })

    it('should return 0', () => {
      expect(wizardControl.calculate({
        "income": 400000,
        "date": new Date(),
        "gender": "F",
        "age": 34,
        "location": "DHAKA"
      })).toEqual({
        "tax": 0,
        "statusCode": 200
      });
    })
    
    it('should return 3000', () => {
      expect(wizardControl.calculate({
        "income": 400000,
        "date": new Date(),
        "gender": "M",
        "age": 34,
        "location": "RANGPUR"
      })).toEqual({
        "tax": 3000,
        "statusCode": 200
      });
    })
  
  });
})
import { Controller, Get, Post, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { CreateIncomeDto } from './dto/createIncomeDto';
import { WizardService } from './wizard.service';
import { CalculatedTax } from './dto/CalculatedTax';

@Controller('wizard')
export class WizardController {
  constructor(private wizardService: WizardService) { }

  @Get()
  root() : string {
    return "TaxWizard Calculator";
  }

  @Post('calculate')
  calculate(@Body() income: CreateIncomeDto): CalculatedTax {
    try {
      let tax = this.wizardService.calculate(income);
      if (tax !== null) {
        return {
          tax: this.wizardService.calculate(income),
          statusCode: 200
        };
      } else {
        throw new HttpException('Tax returned null', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    } catch (error) {
      throw new HttpException('Unknown Error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}
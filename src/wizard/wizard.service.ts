import {Controller, Inject, Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { CreateIncomeDto } from './dto/createIncomeDto';
import { CalculatedTax } from './dto/CalculatedTax';

@Injectable()
export class WizardService {
  constructor() {}

  calculate(income: CreateIncomeDto): number {
    console.log(income)
    return income.income * 0.3;
  }
}
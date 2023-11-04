import {Controller, Inject, Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { CreateIncomeDto } from './dto/CreateIncomeDto';
import { CalculatedTax } from './dto/CalculatedTax';

import * as Sentry from "@sentry/node";

const CITY_CORPOS = ['RAJSHAHI', 'KHULNA', 'BARISAL', 'SYLHET', 'RANGPUR', 'MYMENSINGH'];

@Injectable()
export class WizardService {
  constructor() {}

  calculate(income: CreateIncomeDto): number {
    const transaction = Sentry.startTransaction({
      op: "calculate",
      name: "Calculate Tax",
    });
    // console.log(income);

    /*
      The following strategy will be used to calculate the tax:
      1. For 'M' gender, tax-free income is 350000. For 'F' gender AND any person older than 65 (regardless of gender), tax-free income is 400000.
      2. For the next 100000, tax is 5%.
      3. For the next 300000, tax is 10%.
      4. For the next 400000, tax is 15%.
      5. For the next 500000, tax is 20%.
      6. If income exceeds 1650000 (for 'M'), or 1700000 (for 'F'), all income after that amount is taxed 25%.
    */
    
    let taxFreeIncome = 0;
    if (income.gender == 'M') { taxFreeIncome = 350000; }
    else if (income.gender == 'F' || income.age > 65) { taxFreeIncome = 400000; }
    else {
      Sentry.captureException(new Error("Unsupported gender type"))
      throw new HttpException('Gender should be M or F', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    let taxableIncome = Math.max(income.income - taxFreeIncome, 0);
    
    let tax_5pc = Math.min(taxableIncome, 100000) * 0.05;
    taxableIncome = Math.max(taxableIncome - 100000, 0);

    let tax_10pc = Math.min(taxableIncome, 300000) * 0.1;
    taxableIncome = Math.max(taxableIncome - 300000, 0);

    let tax_15pc = Math.min(taxableIncome, 400000) * 0.15;
    taxableIncome = Math.max(taxableIncome - 400000, 0);

    let tax_20pc = Math.min(taxableIncome, 500000) * 0.2;
    taxableIncome = Math.max(taxableIncome - 500000, 0);

    let tax_25pc = taxableIncome * 0.25;

    let minimumTax = 0;

    if (income.location == 'DHAKA' || income.location == 'CHATTOGRAM') {
      minimumTax = 5000;
    } else if (income.location in CITY_CORPOS) {
      minimumTax = 4000;
    } else {
      minimumTax = 3000;
    }

    let totalTax = tax_5pc + tax_10pc + tax_15pc + tax_20pc + tax_25pc;
    transaction.finish();

    if (totalTax > 0) {
      return Math.max(totalTax, minimumTax);
    } else {
      return 0;
    }
  }
}
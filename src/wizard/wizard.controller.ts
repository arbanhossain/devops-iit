import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';

@Controller('wizard')
export class WizardController {
  constructor() {}

  @Get()
  root() : string {
    return "TaxWizard Calculator";
  }

}
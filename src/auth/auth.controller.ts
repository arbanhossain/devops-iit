import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor() { }

  @Get()
  root(): string {
    return "Authentication";
  }

}
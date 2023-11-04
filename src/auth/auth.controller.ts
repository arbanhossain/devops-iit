import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/AuthRequestDto';
import { postOTPDto } from './dto/postOTPDto';
import { RegistrationDto } from './dto/UserRegistrationDto';
import { TokenVerificationDto } from './dto/TokenVerificationDto';

@Controller('auth')
export class AuthController {
  constructor(private authService:AuthService) { }

  @Get()
  root(): string {
    return "Authentication";
  }

  @Post('request-otp')
  requestOTP(@Body() AuthRequestData: AuthRequestDto): any {
    return this.authService.sendOTP(AuthRequestData);
  }

  @Post('verify-otp')
  verifyOTP(@Body() OTPVerificationData: postOTPDto): any {
    return this.authService.authenticateOTP(OTPVerificationData);
  }

  @Post('verify-token')
  verifyToken(@Body() token: TokenVerificationDto): any {
    return this.authService.isValidToken(token.token, token.id);
  }

  @Post('register')
  register(@Body() userData: RegistrationDto): any {
    return this.authService.register(userData);
  }

}
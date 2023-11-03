import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';

describe('AuthController', () => {
  let authControl: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authControl = app.get<AuthController>(AuthController);
  });


  describe('root', () => {
    it('should return TaxAuth Calculator', () => {
      expect(authControl.root()).toBe('Authentication');
    })
  })
})
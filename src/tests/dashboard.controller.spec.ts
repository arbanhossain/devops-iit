import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from '../dashboard/dashboard.controller';
import { DashboardService } from '../dashboard/dashboard.service';

describe('DashboardController', () => {
  let dashboardControl: DashboardController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [DashboardService],
    }).compile();

    dashboardControl = app.get<DashboardController>(DashboardController);
  });


  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(dashboardControl.root()).toBe('Main Dashboard');
    })
  })
})
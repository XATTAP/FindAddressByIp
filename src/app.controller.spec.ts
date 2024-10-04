import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotFoundException } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('watch ip 218.108.149.37', () => {
      const req = { ip: '218.108.149.37' };
      const resp = {
        lat: 30.2994,
        lng: 120.1612,
        country: 'CN',
        city: 'Hangzhou',
      };

      expect(appController.getIp(req)).toEqual(resp);
    });
    it('watch ip 192.168.1.3', () => {
      const req = { ip: '192.168.1.3' };

      expect(() => {
        appController.getIp(req);
      }).toThrow(new NotFoundException({ message: 'Ip not found' }));
    });
    it('watch ip foo', () => {
      const req = { ip: 'foo' };

      expect(() => {
        appController.getIp(req);
      }).toThrow(new NotFoundException({ message: 'Ip not found' }));
    });
    it('watch ip ""', () => {
      const req = { ip: '' };

      expect(() => {
        appController.getIp(req);
      }).toThrow(new NotFoundException({ message: 'Ip not found' }));
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  INestApplication,
  ValidationError,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const globalPipesOptions: ValidationPipeOptions = {
      whitelist: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const formattedErrors = validationErrors.map((error) => ({
          [error.property]: error.constraints,
        }));
        return new BadRequestException(formattedErrors);
      },
    };

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe(globalPipesOptions));
    await app.init();
  });

  it('(GET) /?ip=218.108.149.37', () => {
    const req = { ip: '218.108.149.37' };
    const resp = {
      lat: 30.2994,
      lng: 120.1612,
      country: 'CN',
      city: 'Hangzhou',
    };

    return request(app.getHttpServer()).get('/').query(req).expect(200, resp);
  });
  it('(GET) /?ip=192.168.1.3', () => {
    const req = { ip: '192.168.1.3' };
    const resp = { message: 'Ip not found' };

    return request(app.getHttpServer())
      .get('/')
      .query(req)
      .expect(404)
      .expect(({ body }) => {
        expect(body).toEqual(resp);
      });
  });
  it('(GET) /?ip=asdf', () => {
    const req = { ip: 'asdf' };
    const resp = [{ ip: { isIp: 'ip must be an ip address' } }];

    return request(app.getHttpServer())
      .get('/')
      .query(req)
      .expect(400)
      .expect(({ body }) => {
        expect(body.message).toEqual(resp);
      });
  });
  it('(GET) /?ip=', () => {
    const req = { ip: '' };
    const resp = [
      {
        ip: {
          isIp: 'ip must be an ip address',
          isNotEmpty: 'ip should not be empty',
        },
      },
    ];

    return request(app.getHttpServer())
      .get('/')
      .query(req)
      .expect(400)
      .expect(({ body }) => {
        expect(body.message).toEqual(resp);
      });
  });
});

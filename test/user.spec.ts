import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('UserController Test', () => {
  let app: INestApplication;
  let logger: Logger
  let testService: TestService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init()

    logger = app.get(WINSTON_MODULE_PROVIDER)
    testService = app.get(TestService);

    // delete user test
    await testService.deleteUser()
  })

  it('/ (POST) should be rejected', async () => {
    const response: any = await request(app.getHttpServer())
      .post('/api/users')
      .send({
        "username": "",
        "password": "",
        "phone": "",
        "email": "",
        "fullname": "",
        "role": ""
      })

    expect(response.status).toBe(400)
    expect(response.body.errors).toBeDefined()
  })

  it('/ (POST)', async () => {
    return request(app.getHttpServer())
      .post('/api/users')
      .send({
        "username": "usernametest",
        "password": "password321",
        "email": "test@test.com",
        "phone": "082120015259",
        "fullname": "Safif Rafi Effendy",
        "role": "owner"
      })
      .expect(201)
  })
})
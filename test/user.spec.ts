import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UserController Test', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init()
  })

  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/users')
      .send({
        "username": "esafif",
        "password": "password321",
        "email": "esafif637@gmail.com",
        "fullname": "Safif Rafi Effendy",
        "role": "owner"
      })
      .expect(201)
  })
})
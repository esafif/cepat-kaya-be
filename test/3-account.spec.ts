import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { TestService } from './test.service';
import { TestModule } from './test.module';
import { User } from 'src/entities/user.entity';

describe('Account Test', () => {
  let app: INestApplication;
  let logger: Logger;
  let testService: TestService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService);
  });

  afterEach(async () => { });

  describe('POST /api/account', () => {
    let userId: string;

    beforeEach(async () => {
      // Buat user sebelum tes login
      await testService.deleteAccount();
      await testService.deleteUserAccount();
      const user = await testService.createUserAccount();
      userId = user.userID; // Assuming createUserAccount returns an object with an id property
    });

    it('should be rejected', async () => {
      const response: any = await request(app.getHttpServer())
        .post('/api/account')
        .set('Authorization', 'testaccount')
        .send({
          name: '',
          balance: 0,
          icon: '',
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should create an account', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/account')
        .set('Authorization', 'testaccount')
        .send({
          name: 'testaccount',
          balance: 0,
          icon: 'testicon',
        });

      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
    });
  });

  describe('GET /api/account', () => {
    let userId: string;

    beforeEach(async () => {
      // Buat user sebelum tes login
      await testService.deleteAccount();
      await testService.deleteUserAccount();
      const user = await testService.createUserAccount();
      userId = user.userID; // Assuming createUserAccount returns an object with an id property
    });

    it('should get all accounts', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/account')
        .set('Authorization', 'testaccount');

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });

  describe('GET /api/account/:id', () => {
    let accountID: string;

    beforeEach(async () => {
      // Buat user sebelum tes login
      await testService.deleteAccount();
      await testService.deleteUserAccount();
      const user = await testService.createUserAccount();
      const account = await testService.createAccount(user.userID);
      accountID = account.accountID;
    });

    it('should get an account', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/account/${accountID}`)
        .set('Authorization', 'testaccount');

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  })

  describe('PUT /api/account/:id', () => {
    let accountID: string;

    beforeEach(async () => {
      // Buat user sebelum tes login
      await testService.deleteAccount();
      await testService.deleteUserAccount();
      const user = await testService.createUserAccount();
      const account = await testService.createAccount(user.userID);
      accountID = account.accountID;
    });

    it('should be rejected', async () => {
      const response: any = await request(app.getHttpServer())
        .put(`/api/account/${accountID}`)
        .set('Authorization', 'testaccount')
        .send({
          name: '',
          balance: 0,
          icon: '',
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should update an account', async () => {
      const response = await request(app.getHttpServer())
        .put(`/api/account/${accountID}`)
        .set('Authorization', 'testaccount')
        .send({
          accountID,
          name: 'testaccount',
          balance: 0,
          icon: 'testicon update',
        });

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  })

  describe('DELETE /api/account/:id', () => {
    let accountID: string;

    beforeEach(async () => {
      // Buat user sebelum tes login
      await testService.deleteAccount();
      await testService.deleteUserAccount();
      const user = await testService.createUserAccount();
      const account = await testService.createAccount(user.userID);
      accountID = account.accountID;
    });

    it('should delete an account', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/api/account/${accountID}`)
        .set('Authorization', 'testaccount');

      expect(response.status).toBe(204);
    });
  })

  afterAll(async () => {
    await app.close();
  });
})
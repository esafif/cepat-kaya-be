import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('Category Test', () => {
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

  describe('POST /api/category', () => {
    let userId: string;

    beforeEach(async () => {
      // Buat user sebelum tes login
      await testService.deleteCategory();
      await testService.deleteUserCategory();
      const user = await testService.createUserCategory();
      userId = user.userID; // Assuming createUserCategory returns an object with an id property
    });

    it('should be rejected', async () => {
      const response: any = await request(app.getHttpServer())
        .post('/api/category')
        .set('Authorization', 'test')
        .send({
          name: '',
          description: '',
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should create a category', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/category')
        .set('Authorization', 'test')
        .send({
          name: 'testcategory',
          description: 'test description',
          type: 'EXPENSE',
          userId: userId, // Include userId in the request payload
        });

      console.log(response.body, "<<< response.body");
      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
    });
  });

  describe('GET /api/category', () => {
    let categoryID: string;

    beforeEach(async () => {
      // Buat user sebelum tes login
      await testService.deleteCategory();
      await testService.deleteUserCategory();
      const user = await testService.createUserCategory();
      const category = await testService.createCategory(user.userID);
      categoryID = category.categoryID;
    });

    it('should get all categories', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/category`)
        .set('Authorization', 'test');

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it('should get a category', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/category/${categoryID}`)
        .set('Authorization', 'test');

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });

  describe('PUT /api/category', () => {
    let categoryID: string;

    beforeEach(async () => {
      // Buat user sebelum tes login
      await testService.deleteCategory();
      await testService.deleteUserCategory();
      const user = await testService.createUserCategory();
      const category = await testService.createCategory(user.userID);
      categoryID = category.categoryID;
    });

    it('should update a category', async () => {
      const response = await request(app.getHttpServer())
        .put(`/api/category/${categoryID}`)
        .set('Authorization', 'test')
        .send({
          categoryID,
          name: 'testcategory',
          description: 'update description',
          type: 'EXPENSE',
        });

      console.log(response.body, "<<< response.body");

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });

  describe('DELETE /api/category', () => {
    let categoryID: string;

    beforeEach(async () => {
      // Buat user sebelum tes login
      await testService.deleteCategory();
      await testService.deleteUserCategory();
      const user = await testService.createUserCategory();
      const category = await testService.createCategory(user.userID);
      categoryID = category.categoryID;
    });

    it('should delete a category', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/api/category/${categoryID}`)
        .set('Authorization', 'test');

      expect(response.status).toBe(204);
      expect(response.body).toBeDefined();
    });
  });

  afterAll(async () => {
    await app.close();
  });
})
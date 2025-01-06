import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { Logger } from "winston";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { TestService } from "./test.service";
import { TestModule } from "./test.module";

describe('Budget Test', () => {
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

  describe('POST /api/budget', () => {
    let userId: string;
    let categoryID: string;

    beforeEach(async () => {
      await testService.deleteBudget();
      await testService.deleteCategory(userId);
      await testService.deleteUser2nd('testbudget');
      const user = await testService.createUser2nd('testbudget', 'testbudget@mail.com', '098989872123', 'testbudget');
      userId = user.userID;
      const category = await testService.createCategory(userId);
      categoryID = category.categoryID;
    });

    it('should be rejected', async () => {
      const response: any = await request(app.getHttpServer())
        .post('/api/budget')
        .set('Authorization', 'testbudget')
        .send({
          name: '',
          limit: 0,
          spent: 0,
          categoryID
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should create a budget', async () => {
      const response: any = await request(app.getHttpServer())
        .post('/api/budget')
        .set('Authorization', 'testbudget')
        .send({
          name: 'testbudget',
          limit: 10000,
          spent: 0,
          categoryID
        });

      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
    });

    afterEach(async () => {
      await testService.deleteBudget();
      await testService.deleteCategory(userId);
      await testService.deleteUser2nd('testbudget');
    });
  });

  describe('PUT /budget', () => {
    let userId: string;
    let categoryID: string;
    let budgetID: string;

    beforeAll(async () => {
      await testService.deleteBudget();
      await testService.deleteCategory(userId);
      await testService.deleteUser2nd('testbudget');
      const user = await testService.createUser2nd('testbudget', 'testbudget@mail.com', '098989872123', 'testbudget');
      userId = user.userID;
      const category = await testService.createCategory(userId);
      categoryID = category.categoryID;
    });

    it('should create a budget', async () => {
      const response: any = await request(app.getHttpServer())
        .post('/api/budget')
        .set('Authorization', 'testbudget')
        .send({
          name: 'testbudget',
          limit: 10000,
          spent: 0,
          categoryID
        });

      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
      expect(response.body.data).toBeDefined();
      expect(response.body.data.budgetID).toBeDefined();
      budgetID = response.body.data.budgetID;
    });

    it('should be rejected', async () => {
      const response: any = await request(app.getHttpServer())
        .put(`/api/budget/${budgetID}`)
        .set('Authorization', 'testbudget')
        .send({
          budgetID,
          name: '',
          limit: 0,
          spent: 0,
        });

      console.log(response.body);
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should update budget', async () => {
      const response: any = await request(app.getHttpServer())
        .put(`/api/budget/${budgetID}`)
        .set('Authorization', 'testbudget')
        .send({
          budgetID,
          categoryID,
          name: 'testbudget',
          limit: 2000,
          spent: 0,
          isActive: true,
        });

      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.data.limit).toBe(2000);
    });

    afterAll(async () => {
      await testService.deleteBudget();
      await testService.deleteCategory(userId);
      await testService.deleteUser2nd('testbudget');
    });
  });

  describe('delete budget', () => {
    let userId: string;
    let categoryID: string;
    let budgetID: string;

    beforeAll(async () => {
      await testService.deleteBudget();
      await testService.deleteCategory(userId);
      await testService.deleteUser2nd('testbudget');
      const user = await testService.createUser2nd('testbudget', 'testbudget@mail.com', '098989872123', 'testbudget');
      userId = user.userID;
      const category = await testService.createCategory(userId);
      categoryID = category.categoryID;
    });

    it('delete budget', async () => {
      const response: any = await request(app.getHttpServer())
        .post('/api/budget')
        .set('Authorization', 'testbudget')
        .send({
          name: 'testbudget',
          limit: 10000,
          spent: 0,
          categoryID
        });

      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
      expect(response.body.data).toBeDefined();
      expect(response.body.data.budgetID).toBeDefined();
      budgetID = response.body.data.budgetID;

      const responseDelete: any = await request(app.getHttpServer())
        .delete(`/api/budget/${budgetID}`)
        .set('Authorization', 'testbudget');

      expect(responseDelete.status).toBe(204);
      expect(responseDelete.body).toBeDefined();
    });

    afterAll(async () => {
      await testService.deleteBudget();
      await testService.deleteCategory(userId);
      await testService.deleteUser2nd('testbudget');
    });
  });

  describe('GET /api/budget', () => {
    let userId: string;
    let categoryID: string;

    beforeAll(async () => {
      await testService.deleteBudget();
      await testService.deleteCategory(userId);
      await testService.deleteUser2nd('testbudget');
      const user = await testService.createUser2nd('testbudget', 'testbudget@mail.com', '098989872123', 'testbudget');
      userId = user.userID;
      const category = await testService.createCategory(userId);
      categoryID = category.categoryID;
    });

    it('should return all budgets', async () => {
      const response: any = await request(app.getHttpServer())
        .get('/api/budget')
        .set('Authorization', 'testbudget');

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should return an empty array if no budgets exist', async () => {
      await testService.deleteBudget(); // Ensure no budgets exist

      const response: any = await request(app.getHttpServer())
        .get('/api/budget')
        .set('Authorization', 'testbudget');

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.data).toEqual([]);
    });

    afterAll(async () => {
      await testService.deleteBudget();
      await testService.deleteCategory(userId);
      await testService.deleteUser2nd('testbudget');
    });
  });

  describe('GET /api/budget/:id', () => {
    let userId: string;
    let categoryID: string;
    let budgetID: string;

    beforeAll(async () => {
      await testService.deleteBudget();
      await testService.deleteCategory(userId);
      await testService.deleteUser2nd('testbudget');
      const user = await testService.createUser2nd('testbudget', 'testbudget@mail.com', '098989872123', 'testbudget');
      userId = user.userID;
      const category = await testService.createCategory(userId);
      categoryID = category.categoryID;
    });

    it('should create a budget', async () => {
      const response: any = await request(app.getHttpServer())
        .post('/api/budget')
        .set('Authorization', 'testbudget')
        .send({
          name: 'testbudget',
          limit: 10000,
          spent: 0,
          categoryID
        });

      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
      expect(response.body.data).toBeDefined();
      expect(response.body.data.budgetID).toBeDefined();
      budgetID = response.body.data.budgetID;
    });

    it('should return a budget by ID', async () => {
      const response: any = await request(app.getHttpServer())
        .get(`/api/budget/${budgetID}`)
        .set('Authorization', 'testbudget');

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.data).toBeDefined();
      expect(response.body.data.budgetID).toBe(budgetID);
    });

    it('should return 404 if budget not found', async () => {
      const response: any = await request(app.getHttpServer())
        .get('/api/budget/invalid-id')
        .set('Authorization', 'testbudget');

      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data).toBe(null);
    });

    afterAll(async () => {
      await testService.deleteBudget();
      await testService.deleteCategory(userId);
      await testService.deleteUser2nd('testbudget');
    });
  });
});

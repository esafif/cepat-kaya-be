import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { Logger } from "winston";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { TestService } from "./test.service";
import { TestModule } from "./test.module";

describe("Transaction Test", () => {
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

  describe("POST /api/transaction", () => {
    let userId: string;
    let categoryID: string;
    let accountID: string;

    beforeEach(async () => {
      // Buat user sebelum tes login
      await testService.deleteTransaction();
      await testService.deleteAccount();
      await testService.deleteCategory(userId);
      await testService.deleteUserTransaction();

      // create user
      const user = await testService.createUser2nd(
        "testtransaction",
        "transaction@mail.com",
        "12345677890",
        "transactiontoken",
      );
      userId = user.userID;

      // create category
      const category = await testService.createCategory(userId);
      categoryID = category.categoryID;

      // create account
      const account = await testService.createAccount(userId);
      accountID = account.accountID;
    });

    it("should be rejected", async () => {
      const response: any = await request(app.getHttpServer())
        .post("/api/transaction")
        .set("Authorization", "transactiontoken")
        .send({
          amount: 0,
          description: "",
          categoryID: "",
          accountID: "",
          type: "EXPENSE",
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it("should create a transaction", async () => {
      const response = await request(app.getHttpServer())
        .post("/api/transaction")
        .set("Authorization", "transactiontoken")
        .send({
          name: "testtransaction",
          amount: 1000,
          categoryID,
          accountID,
          type: "EXPENSE",
          note: "test note",
          date: new Date(),
        });

      expect(response.status).toBe(201);
      expect(response.body.data.transactionID).toBeDefined();
    });
  });

  describe("PUT /api/transaction", () => {
    let userId: string;
    let categoryID: string;
    let accountID: string;
    let transactionID: string;

    beforeAll(async () => {
      // Buat user sebelum tes login
      await testService.deleteTransaction();
      await testService.deleteAccount();
      await testService.deleteCategory(userId);
      await testService.deleteUserTransaction();

      // create user
      // create user
      const user = await testService.createUser2nd(
        "testtransaction",
        "transaction@mail.com",
        "12345677890",
        "transactiontoken",
      );
      userId = user.userID;

      // create category
      const category = await testService.createCategory(userId);
      categoryID = category.categoryID;

      // create account
      const account = await testService.createAccount(userId);
      accountID = account.accountID;
    })

    it("should create a transaction", async () => {
      const response = await request(app.getHttpServer())
        .post("/api/transaction")
        .set("Authorization", "transactiontoken")
        .send({
          name: "testtransaction",
          amount: 1000,
          categoryID,
          accountID,
          type: "EXPENSE",
          note: "test note",
          date: new Date(),
        });

      expect(response.status).toBe(201);
      expect(response.body.data.transactionID).toBeDefined();

      transactionID = response.body.data.transactionID;
    });

    it("should be rejected", async () => {
      const response: any = await request(app.getHttpServer())
        .put("/api/transaction/" + transactionID)
        .set("Authorization", "transactiontoken")
        .send({
          transactionID: transactionID,
          amount: 0,
          type: "EXPENSE",
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    })

    it("should update transaction", async () => {
      const response = await request(app.getHttpServer())
        .put("/api/transaction/" + transactionID)
        .set("Authorization", "transactiontoken")
        .send({
          transactionID,
          amount: 2000,
          categoryID,
          accountID,
          type: "EXPENSE",
          note: "test note",
          date: new Date(),
        });

      expect(response.status).toBe(200);
      expect(response.body.data.amount).toBe(2000);
    })
  })

  describe("GET /api/transaction", () => {
    let userId: string;
    let categoryID: string;
    let accountID: string;
    let transactionID: string;

    beforeAll(async () => {
      // Buat user sebelum tes login
      await testService.deleteTransaction();
      await testService.deleteAccount();
      await testService.deleteCategory(userId);
      await testService.deleteUserTransaction();

      // create user
      const user = await testService.createUser2nd(
        "testtransaction",
        "transaction@mail.com",
        "12345677890",
        "transactiontoken",
      );
      userId = user.userID;

      // create category
      const category = await testService.createCategory(userId);
      categoryID = category.categoryID;

      // create account
      const account = await testService.createAccount(userId);
      accountID = account.accountID;

      // create transaction
      const transaction = await testService.createTransaction(userId, accountID, categoryID);
      transactionID = transaction.transactionID;
    })

    it("should get all transactions", async () => {
      const response = await request(app.getHttpServer())
        .get("/api/transaction")
        .set("Authorization", "transactiontoken");

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    })

    it("should get a transaction by ID", async () => {
      const response = await request(app.getHttpServer())
        .get("/api/transaction/" + transactionID)
        .set("Authorization", "transactiontoken");

      expect(response.status).toBe(200);
      expect(response.body.data.transactionID).toBe(transactionID);
    })
  })

  describe("DELETE /api/transaction", () => {
    let userId: string;
    let categoryID: string;
    let accountID: string;
    let transactionID: string;

    beforeAll(async () => {
      // Buat user sebelum tes login
      await testService.deleteTransaction();
      await testService.deleteAccount();
      await testService.deleteCategory(userId);
      await testService.deleteUserTransaction();

      // create user
      const user = await testService.createUser2nd(
        "testtransaction",
        "transaction@mail.com",
        "12345677890",
        "transactiontoken",
      );
      userId = user.userID;

      // create category
      const category = await testService.createCategory(userId);
      categoryID = category.categoryID;

      // create account
      const account = await testService.createAccount(userId);
      accountID = account.accountID;

      // create transaction
      const transaction = await testService.createTransaction(userId, accountID, categoryID);
      transactionID = transaction.transactionID;
    });

    it("should delete a transaction", async () => {
      const response = await request(app.getHttpServer())
        .delete("/api/transaction/" + transactionID)
        .set("Authorization", "transactiontoken");

      expect(response.status).toBe(204);
    })
  })
})
import { Injectable } from "@nestjs/common";
import { PrismaService } from "./../src/common/prisma.service";
import * as bcrypt from 'bcrypt';


@Injectable()
export class TestService {
  constructor(
    private prismaService: PrismaService
  ) { }

  async deleteTransaction() {
    await this.prismaService.transaction.deleteMany({
      where: {
        name: 'testtransaction'
      }
    })
  }

  async deleteUserTransaction() {
    await this.prismaService.user.deleteMany({
      where: {
        username: 'testtransaction'
      }
    })
  }

  async createTransaction(userID: string, accountID: string, categoryID: string) {
    return await this.prismaService.transaction.create({
      data: {
        transactionID: Date.now().toString(),
        name: 'testtransaction',
        amount: 1000,
        type: 'EXPENSE',
        note: 'testtransaction',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryID,
        accountID,
        userID,
        isActive: true
      }
    })
  }

  async createUserTransaction() {
    return await this.prismaService.user.create({
      data: {
        userID: Date.now().toString(),
        username: 'testtransaction',
        password: await bcrypt.hash("password321", 10),
        email: 'transaction@mail.com',
        phone: '1234567890',
        role: 'OWNER',
        fullname: 'Test Transaction',
        token: 'test transaction'
      }
    })
  }


  async createUser2nd(username: string, email: string, phone: string, token: string) {
    return await this.prismaService.user.create({
      data: {
        userID: Date.now().toString(),
        username,
        password: await bcrypt.hash("password321", 10),
        email,
        phone,
        role: 'OWNER',
        fullname: 'Test any',
        token
      }
    })
  }

  async deleteUser2nd(username: string) {
    await this.prismaService.user.deleteMany({
      where: {
        username,
      }
    })
  }

  async deleteBudget() {
    await this.prismaService.budget.deleteMany({
      where: {
        name: 'testbudget'
      }
    })
  }


  async deleteAccount() {
    await this.prismaService.account.deleteMany({
      where: {
        name: 'testaccount'
      }
    })
  }

  async createUserAccount() {
    return await this.prismaService.user.create({
      data: {
        userID: Date.now().toString(),
        username: 'testaccount',
        password: await bcrypt.hash("password321", 10),
        email: 'testaccount@example.com',
        phone: '1234564422',
        role: 'OWNER',
        fullname: 'Test Account',
        token: 'testaccount'
      }
    })
  }

  async createAccount(userId: string) {
    return await this.prismaService.account.create({
      data: {
        accountID: Date.now().toString(),
        name: 'testaccount',
        icon: 'testicon',
        balance: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        userID: userId,
        isActive: true
      }
    })
  }

  async deleteUserAccount() {
    await this.prismaService.user.deleteMany({
      where: {
        username: 'testaccount'
      }
    })
  }

  async createCategory(userId: string) {
    return await this.prismaService.category.create({
      data: {
        categoryID: Date.now().toString(),
        name: 'testcategory',
        description: 'testcategory',
        type: 'EXPENSE',
        icon: 'testicon',
        createdAt: new Date(),
        updatedAt: new Date(),
        userID: userId,
        isActive: true
      }
    })
  }

  async deleteCategory(userID?: string) {
    await this.prismaService.category.deleteMany({
      where: {
        name: 'testcategory',
        userID
      }
    })
  }

  async deleteUserCategory() {
    await this.prismaService.user.deleteMany({
      where: {
        username: 'testcategory'
      }
    })
  }

  async createUserCategory() {
    return await this.prismaService.user.create({
      data: {
        userID: Date.now().toString(),
        username: 'testcategory',
        password: await bcrypt.hash("password321", 10),
        email: 'category@example.com',
        phone: '1234567822',
        role: 'OWNER',
        fullname: 'Test Category',
        token: 'test'
      }
    })
  }


  async deleteUser() {
    await this.prismaService.user.deleteMany({
      where: {
        username: 'usernametest'
      }
    })
  }

  async createUser() {
    await this.prismaService.user.create({
      data: {
        userID: Date.now().toString(),
        username: 'usernametest',
        password: await bcrypt.hash("password321", 10),
        email: 'test@example.com',
        phone: '1234567890',
        role: 'OWNER',
        fullname: 'Test User',
        token: 'test'
      }
    })
  }
}
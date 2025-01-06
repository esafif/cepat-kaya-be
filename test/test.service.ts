import { Injectable } from "@nestjs/common";
import { PrismaService } from "./../src/common/prisma.service";
import * as bcrypt from 'bcrypt';


@Injectable()
export class TestService {
  constructor(
    private prismaService: PrismaService
  ) { }


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
import { Injectable } from "@nestjs/common";
import { PrismaService } from "./../src/common/prisma.service";
import * as bcrypt from 'bcrypt';


@Injectable()
export class TestService {
  constructor(
    private prismaService: PrismaService
  ) { }

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

  async deleteCategory() {
    await this.prismaService.category.deleteMany({
      where: {
        name: 'testcategory'
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
import { Injectable } from "@nestjs/common";
import { PrismaService } from "./../src/common/prisma.service";
import * as bcrypt from 'bcrypt';


@Injectable()
export class TestService {
  constructor(
    private prismaService: PrismaService
  ) { }

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
        role: 'user',
        fullname: 'Test User'
      }
    })
  }
}
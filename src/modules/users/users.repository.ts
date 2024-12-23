import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../../common/prisma.service';
import { v4 as uuid } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    private prismaService: PrismaService
  ) {
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, role, email, fullname, phone } = createUserDto

    const user: User = {
      userID: Date.now().toString(), ...createUserDto,
      username,
      password,
      phone,
      role,
      email,
      fullname,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await this.prismaService.user.create({ data: user });

    return user;
  }

  async findByEmail(username: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: {
        username
      }
    });
  }

  async count(email: string): Promise<number> {
    return this.prismaService.user.count({
      where: {
        email
      }
    })
  }

  async update(id: string, logout: boolean = false): Promise<User> {
    const user = await this.prismaService.user.update({
      where: {
        userID: id
      },
      data: {
        token: !logout ? uuid() : null
      }
    });

    return user;
  }

  async updateUser(data: User): Promise<User> {
    const user = await this.prismaService.user.update({
      where: {
        userID: data.userID
      },
      data
    });

    return user;
  }

  // findOne(id: string): User {
  //   return this.users.find(user => user.userID === id);
  // }

  // update(id: string, updateUserDto: UpdateUserDto): User {
  //   const user = this.findOne(id);
  //   Object.assign(user, updateUserDto);
  //   return user;
  // }
}
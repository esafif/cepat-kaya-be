import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(
    private prismaService: PrismaService
  ) {
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, role, email, fullname } = createUserDto

    const user: User = {
      userID: Date.now().toString(), ...createUserDto,
      username,
      password,
      role,
      email,
      fullname,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    try {
      await this.prismaService.user.create({ data: user });
    } catch (error) {
      console.log(error, "<<< this is error")
    }

    return user;
  }

  async count(email: string): Promise<number> {
    return this.prismaService.user.count({
      where: {
        email
      }
    })
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
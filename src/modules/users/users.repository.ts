import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  private users: User[] = [];

  create(createUserDto: CreateUserDto): User {
    const user: User = {
      userID: Date.now().toString(), ...createUserDto,
      username: '',
      password: '',
      role: '',
      email: '',
      fullname: '',
      isActive: false,
      createdAt: undefined,
      updatedAt: undefined
    };
    this.users.push(user);
    return user;
  }

  findOne(id: string): User {
    return this.users.find(user => user.userID === id);
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    const user = this.findOne(id);
    Object.assign(user, updateUserDto);
    return user;
  }
}
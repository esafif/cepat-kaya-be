import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) { }

export class ResposeUser {
  userID: number;
  fullname: string;
  updatedAt: Date;
}
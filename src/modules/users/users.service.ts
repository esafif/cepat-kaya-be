import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, ResCreateUser } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationService } from './../../common/validation.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { UserValidation } from './users.validation';
import { UsersRepository } from './users.repository';
import * as bcrypt from "bcrypt";


@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger
  ) { }

  async register(request: CreateUserDto): Promise<ResCreateUser> {
    this.logger.info(`Register new user ${JSON.stringify(request)}`);
    const registerRequest: CreateUserDto = this.validationService.validate(UserValidation.REGISTER, request);
    const findSameEmail: number = await this.userRepository.count(registerRequest.email)

    if (findSameEmail !== 0) {
      throw new HttpException(`Email already exists`, 400)
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const {
      userID,
      username,
      email,
      fullname,
      createdAt,
      updatedAt
    } = await this.userRepository.create(registerRequest)

    return {
      userID,
      username,
      email,
      fullname,
      createdAt,
      updatedAt
    }
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

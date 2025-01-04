import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, ResCreateUser } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationService } from './../../common/validation.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { UserValidation } from './users.validation';
import { UsersRepository } from './users.repository';
import * as bcrypt from "bcrypt";
import { LoginUserRequest, LoginUserResponse } from './dto/login-user.dto';
import { User } from '../../entities/user.entity';



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
      phone,
      fullname,
      createdAt,
      updatedAt
    } = await this.userRepository.create(registerRequest)

    return {
      userID,
      username,
      email,
      phone,
      fullname,
      createdAt,
      updatedAt
    }
  }

  async login(request: LoginUserRequest): Promise<LoginUserResponse> {
    this.logger.info(`Login user ${JSON.stringify(request)}`);
    const loginRequest: LoginUserRequest = this.validationService.validate(UserValidation.LOGIN, request);
    let user = await this.userRepository.findByEmail(loginRequest.username);

    if (!user) {
      throw new HttpException(`Username or password is invalid`, 404);
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(`Username or password is invalid`, 404);
    }

    user = await this.userRepository.update(user.userID)

    const {
      userID,
      username,
      token
    } = user;

    return {
      userID,
      username,
      token
    };
  }

  async update(user: User, request: UpdateUserDto): Promise<UpdateUserDto> {
    this.logger.info(`Update user ${JSON.stringify(request)}`);
    const updateRequest: UpdateUserDto = this.validationService.validate(UserValidation.UPDATE, request);

    if (updateRequest.fullname) {
      user.fullname = updateRequest.fullname;
    }

    if (updateRequest.password) {
      user.password = await bcrypt.hash(updateRequest.password, 10);
    }

    const updatedUser = await this.userRepository.updateUser(user);

    return updatedUser;
  }

  async logout(user: User): Promise<any> {
    await this.userRepository.update(user.userID, true);
  }

  async get(user: User): Promise<User> {
    return user;
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

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

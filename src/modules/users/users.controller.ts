import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, ResCreateUser } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { WebResponse } from 'src/entities/web.entity';
import { LoginUserRequest, LoginUserResponse } from './dto/login-user.dto';
import { User } from '@prisma/client';
import { Auth } from '../../common/auth.decorator';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<WebResponse<ResCreateUser>> {
    const result = await this.usersService.register(createUserDto)

    return {
      data: result
    }
  }

  @Post('/login')
  async login(@Body() loginRequest: LoginUserRequest): Promise<WebResponse<LoginUserResponse>> {
    const result = await this.usersService.login(loginRequest)

    return {
      data: result
    }
  }

  @Get('/current')
  @HttpCode(200)
  async get(@Auth() user: User): Promise<WebResponse<User>> {
    return { data: await this.usersService.get(user) };
  }

  @Put()
  @HttpCode(201)
  async update(@Body() updateUserDto: UpdateUserDto, @Auth() user: User): Promise<WebResponse<UpdateUserDto>> {
    return { data: await this.usersService.update(user, updateUserDto) };
  }

  @Post('/logout')
  @HttpCode(204)
  async logout(@Auth() user: User): Promise<void> {
    await this.usersService.logout(user);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}


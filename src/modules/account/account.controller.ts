import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto, ResCreateAccountDto, UpdateAccountDto } from './dto/create-account.dto';
import { WebResponse } from '../../entities/web.entity';
import { Auth } from '../../common/auth.decorator';
import { User } from '../../entities/user.entity';

@Controller('api/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Post()
  @HttpCode(201)
  async create(@Auth() user: User, @Body() createAccountDto: CreateAccountDto): Promise<WebResponse<ResCreateAccountDto>> {
    return {
      data: await this.accountService.create(createAccountDto, user),
    }
  }

  @Get()
  @HttpCode(200)
  async findAll(@Auth() user: User): Promise<WebResponse<ResCreateAccountDto[]>> {
    return {
      data: await this.accountService.findAll(user),
    }
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Auth() user: User, @Param('id') id: string): Promise<WebResponse<ResCreateAccountDto>> {
    return {
      data: await this.accountService.findOne(id, user),
    }
  }

  @Put(':id')
  @HttpCode(200)
  async update(@Auth() user: User, @Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto): Promise<WebResponse<ResCreateAccountDto>> {
    return {
      data: await this.accountService.update(id, updateAccountDto, user),
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Auth() user: User, @Param('id') id: string): Promise<WebResponse<void>> {
    await this.accountService.delete(id, user);
    return {
      data: null,
    }
  }

  // @Get()
  // findAll() {
  //   return this.accountService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.accountService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
  //   return this.accountService.update(id, updateAccountDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.accountService.remove(id);
  // }
}

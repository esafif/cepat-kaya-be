import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransaction, ResCreateTransaction } from './dto/transaction.dto';
import { WebResponse } from '../../entities/web.entity';
import { Auth } from '../../common/auth.decorator';
import { Transaction } from '../../entities/transaction.entity';
import { User } from '../../entities/user.entity';

@Controller('api/transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  @Post()
  @HttpCode(201)
  async create(@Auth() user: User, @Body() createTransactionDto: CreateTransaction): Promise<WebResponse<Transaction>> {
    return {
      data: await this.transactionService.create(createTransactionDto, user),
    }
  }

  @Put(':id')
  @HttpCode(200)
  async update(@Auth() user: User, @Param('id') id: string, @Body() updateTransactionDto: CreateTransaction): Promise<WebResponse<Transaction>> {
    return {
      data: await this.transactionService.update(id, updateTransactionDto, user),
    }
  }

  @Get()
  @HttpCode(200)
  async findAll(@Auth() user: User): Promise<WebResponse<Transaction[] | []>> {
    return {
      data: await this.transactionService.findAll(user),
    }
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Auth() user: User, @Param('id') id: string): Promise<WebResponse<Transaction>> {
    return {
      data: await this.transactionService.findOne(id, user)
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Auth() user: User, @Param('id') id: string): Promise<void> {
    return await this.transactionService.delete(id, user);
  }
}
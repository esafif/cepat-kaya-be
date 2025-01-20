import { Injectable, Inject } from '@nestjs/common';
import { CreateTransaction, ResCreateTransaction } from './dto/transaction.dto';
import { User } from 'src/entities/user.entity';
import { ValidationService } from './../../common/validation.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { TransactionValidation } from './transaction.validation';
import { TransactionRepository } from './transaction.repository';
import { Transaction } from '../../entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger
  ) { }

  async create(createTransactionDto: CreateTransaction, user: User): Promise<Transaction> {
    this.logger.info(`Create new transaction ${JSON.stringify(createTransactionDto)}`);
    const createTransactionRequest: CreateTransaction = this.validationService.validate(TransactionValidation.CREATE, createTransactionDto);
    return await this.transactionRepository.create(createTransactionRequest, user);
  }

  async update(id: string, updateTransactionDto: CreateTransaction, user: User): Promise<Transaction> {
    this.logger.info(`Update transaction ${id} with data ${JSON.stringify(updateTransactionDto)}`);
    const updateTransactionRequest: CreateTransaction = this.validationService.validate(TransactionValidation.UPDATE, updateTransactionDto);
    return await this.transactionRepository.update(id, updateTransactionRequest);
  }

  async delete(id: string, user: User): Promise<void> {
    this.logger.info(`Delete transaction ${id}`);
    await this.transactionRepository.delete(id);
  }

  async findAll(user: User): Promise<Transaction[]> {
    this.logger.info(`Get all transactions of user ${user.userID}`);
    return await this.transactionRepository.findAll(user);
  }

  async findOne(id: string, user: User): Promise<Transaction> {
    this.logger.info(`Get transaction ${id} of user ${user.userID}`);
    return await this.transactionRepository.findById(id);
  }
}
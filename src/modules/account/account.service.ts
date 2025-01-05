import { Inject, Injectable } from '@nestjs/common';
import { CreateAccountDto, ResCreateAccountDto, UpdateAccountDto, ResUpdateAccountDto } from './dto/create-account.dto';
import { ValidationService } from './../../common/validation.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { User } from '../../entities/user.entity';
import { AccountRepository } from './account.repository';
import { AccountValidation } from './account.validation';


@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger
  ) { }

  async create(createAccountDto: CreateAccountDto, user: User): Promise<ResCreateAccountDto> {
    this.logger.info(`Create new account ${JSON.stringify(createAccountDto)}`);
    const createAccountRequest: CreateAccountDto = this.validationService.validate(AccountValidation.CREATE, createAccountDto);
    return await this.accountRepository.create(createAccountRequest, user);
  }

  async update(accountID: string, updateAccountDto: UpdateAccountDto, user: User): Promise<ResUpdateAccountDto> {
    this.logger.info(`Update account ${accountID} with data ${JSON.stringify(updateAccountDto)}`);
    const updateAccountRequest: UpdateAccountDto = this.validationService.validate(AccountValidation.UPDATE, updateAccountDto);
    return await this.accountRepository.update(accountID, updateAccountRequest);
  }

  async findAll(user: User): Promise<ResUpdateAccountDto[]> {
    this.logger.info(`Get all accounts of user ${user.userID}`);
    return await this.accountRepository.findAll(user.userID);
  }

  async findOne(accountID: string, user: User): Promise<ResUpdateAccountDto> {
    this.logger.info(`Get account ${accountID} of user ${user.userID}`);
    return await this.accountRepository.findOne(accountID, user.userID);
  }

  async delete(accountID: string, user: User): Promise<void> {
    this.logger.info(`Delete account ${accountID}`);
    return await this.accountRepository.delete(accountID, user.userID);
  }
}

import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { PrismaService } from '../../common/prisma.service';
import { AccountRepository } from './account.repository';

@Module({
  providers: [AccountService, PrismaService, AccountRepository],
  controllers: [AccountController],
})
export class AccountModule { }

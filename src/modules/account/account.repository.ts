import { Injectable } from "@nestjs/common";
import { Account } from "src/entities/account.entity";
import { CreateAccountDto } from "./dto/create-account.dto";
// import { UpdateAccountDto } from "./dto/update-account.dto";
import { PrismaService } from "../../common/prisma.service";
import { User } from "src/entities/user.entity";

@Injectable()
export class AccountRepository {
  constructor(
    private prismaService: PrismaService,
  ) { }

  async create(createAccountDto: CreateAccountDto, user: User): Promise<Account> {
    const { name, icon } = createAccountDto;

    const account: Account = {
      accountID: Date.now().toString(),
      name,
      icon,
      balance: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      userID: user.userID,
      isActive: true
    };

    await this.prismaService.account.create({ data: account });

    return account;
  }

  async update(accountID: string, data: any): Promise<Account> {
    const updatedAccount = await this.prismaService.account.update({
      where: { accountID },
      data: {
        ...data,
        updatedAt: new Date()
      }
    });

    return updatedAccount;
  }

  async findAll(userID: string): Promise<Account[]> {
    return this.prismaService.account.findMany({
      where: { userID, isActive: true }
    });
  }

  async findOne(accountID: string, userID: string): Promise<Account | null> {
    return this.prismaService.account.findFirst({
      where: { accountID, userID, isActive: true }
    });
  }

  async delete(accountID: string, userID: string): Promise<any> {
    return await this.prismaService.account.delete({
      where: { accountID, userID }
    });
  }
}

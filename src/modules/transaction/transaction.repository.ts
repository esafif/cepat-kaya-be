import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../common/prisma.service";
import { CreateTransaction, UpdateTransaction } from "./dto/transaction.dto";
import { Transaction } from "../../entities/transaction.entity";
import { v4 as uuid } from "uuid";
import { User } from "src/entities/user.entity";

@Injectable()
export class TransactionRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateTransaction, user: User): Promise<Transaction> {
    const { name, amount, categoryID, accountID, type, note, date } = data;

    const transaction: Transaction = {
      transactionID: uuid(),
      name,
      amount,
      categoryID,
      accountID,
      userID: user.userID,
      type,
      note,
      date,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
    };

    await this.prisma.transaction.create({
      data: transaction,
    });

    return transaction
  }

  async update(transactionID: string, data: UpdateTransaction): Promise<Transaction> {
    const { amount, categoryID, accountID, type, note, date } = data;

    const transaction = await this.prisma.transaction.update({
      where: { transactionID },
      data: {
        amount,
        categoryID,
        accountID,
        type,
        note,
        date,
        updatedAt: new Date()
      }
    });

    return transaction;
  }

  async delete(transactionID: string): Promise<Transaction> {
    const transaction = await this.prisma.transaction.delete({
      where: { transactionID },
    });

    return transaction;
  }

  async findById(transactionID: string): Promise<Transaction | null> {
    return this.prisma.transaction.findUnique({
      where: { transactionID },
    });
  }

  async findAll(user: User): Promise<Transaction[]> {
    return this.prisma.transaction.findMany({
      where: {
        userID: user.userID
      }
    })
  }
}

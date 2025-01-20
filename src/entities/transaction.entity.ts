import { User } from './user.entity';
import { Category } from './category.entity';
import { Account } from './account.entity';
import { TransactionType as transactionType } from '@prisma/client';

export class Transaction {
  transactionID: string;
  name: string;
  amount: number;
  categoryID: string;
  // category: Category;
  accountID: string;
  // account: Account;
  userID: string;
  type: transactionType;
  note?: string;
  date: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}


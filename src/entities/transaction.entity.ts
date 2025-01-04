import { User } from './user.entity';
import { Category } from './category.entity';
import { Account } from './account.entity';

export class Transaction {
  transactionID: string;
  name: string;
  amount: number;
  categoryID: string;
  category: Category;
  accountID: string;
  account: Account;
  userID: string;
  type: TransactionType;
  note?: string;
  date: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: User;
}

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  TRANSFER = 'TRANSFER',
}

import { User } from './user.entity';
import { Transaction } from './transaction.entity';

export class Account {
  accountID: string;
  name: string;
  userID: string;
  balance: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: User;
}

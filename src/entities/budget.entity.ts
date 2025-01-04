import { User } from './user.entity';
import { Category } from './category.entity';

export class Budget {
  budgetID: string;
  name: string;
  limit: number;
  spent: number;
  categoryID: string;
  category: Category;
  userID: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: User;
}

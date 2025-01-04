import { User } from './user.entity';
import { CategoryType as categoryType } from '@prisma/client';

export class Category {
  categoryID: string;
  name: string;
  description?: string;
  userID: string;
  type: categoryType;
  icon?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

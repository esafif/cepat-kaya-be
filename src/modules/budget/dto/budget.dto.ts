import { User } from '../../../entities/user.entity'

export class CreateBudgetDto {
  name: string;
  limit: number;
  spent: number;
  categoryID: string;
  // TODO: BUDGET NEED START-DATE AND END-DATE IN FUTURE BUT TEMPORARY SET FOR PRESENT MONTH 
}

export class ResCreateBudgetDto {
  budgetID: string;
  name: string;
  limit: number;
  spent: number;
  categoryID: string;
  userID: string;
  endDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: User;
}

export class UpdateBudgetDto {
  budgetID: string;
  name: string;
  limit: number;
  spent: number;
  categoryID: string;
  userID: string;
  // TODO: BUDGET NEED START-DATE AND END-DATE IN FUTURE BUT TEMPORARY SET FOR PRESENT MONTH 
}
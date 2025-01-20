import { PartialType } from "@nestjs/mapped-types";

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  TRANSFER = 'TRANSFER',
}


export class CreateTransaction {
  name: string;
  amount: number;
  categoryID: string;
  accountID: string;
  type: TransactionType;
  note?: string;
  date: Date;
}

export class ResCreateTransaction {
  transactionID: string;
  name: string;
  amount: number;
  type: TransactionType;
  note?: string;
  date: Date;
  isActive: boolean;
}

export class UpdateTransaction extends PartialType(CreateTransaction) { }

export class ResUpdateTransaction extends PartialType(ResCreateTransaction) { }
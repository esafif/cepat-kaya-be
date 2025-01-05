export class CreateAccountDto {
  name: string;
  balance?: number;
  icon?: string
  isActive?: boolean;
}

export class ResCreateAccountDto {
  accountID: string;
  name: string;
  balance: number;
  icon?: string;
  isActive?: boolean;
}

export class UpdateAccountDto {
  accountID: string;
  name: string;
  balance: number;
  icon?: string;
  isActive?: boolean;
}

export class ResUpdateAccountDto {
  accountID: string;
  name: string;
  userID: string;
  balance: number;
  icon?: string;
  isActive?: boolean;
}

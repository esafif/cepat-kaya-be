export class CreateUserDto {
  username: string;
  password: string;
  email: string;
  phone: string;
  fullname: string;
  role: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date
}

export class ResCreateUser {
  userID: string;
  fullname: string;
  username: string;
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

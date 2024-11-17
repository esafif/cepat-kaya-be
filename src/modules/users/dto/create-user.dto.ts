export class CreateUserDto {
  username: string;
  password: string;
  email: string;
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
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

import { Role as UserRole } from '@prisma/client';

export class User {
  userID: string;
  username: string;
  password: string;
  phone: string;
  role: UserRole;
  email: string;
  fullname: string;
  token?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

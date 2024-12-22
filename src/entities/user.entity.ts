export class User {
  userID: string;
  username: string;
  password: string;
  phone: string;
  role: string;
  email: string;
  fullname: string;
  isActive: boolean;
  token?: string;
  createdAt: Date;
  updatedAt: Date
}

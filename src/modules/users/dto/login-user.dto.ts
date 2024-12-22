export class LoginUserRequest {
  username: string;
  password: string;
}

export class LoginUserResponse {
  userID: string;
  username: string;
  token: string;
}


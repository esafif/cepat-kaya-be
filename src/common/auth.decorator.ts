import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";

export const Auth: any = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  const user = request.user

  if (user) {
    return user;
  } else {
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
})
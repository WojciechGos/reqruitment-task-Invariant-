import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUserDTO } from '../auth/dto/current-user.dto';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) : CurrentUserDTO  => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

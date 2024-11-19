import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TwitterUserDTO } from '../auth/dto/twitter-user.dto';

export const TwitterUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): TwitterUserDTO => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

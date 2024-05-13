import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  @Inject(UsersService)
  userService: UsersService;

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();

    try {
      const { user } = request;
      console.log('me', request.user);
      console.log(request.claims);
      request.currentUser = user;
    } catch (error) {
      console.log('Error', error);
      throw new BadRequestException();
    }
    return handler.handle();
  }
}

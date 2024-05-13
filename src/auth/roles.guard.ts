import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesEnum } from '../users/interfaces/roles.enum';
import { ROLES_KEY } from '../utils/constants';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { User } from '../users/user.entity';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') implements IAuthGuard {
  constructor(private reflector: Reflector) {
    super();
  }

  public handleRequest(err: unknown, user: User): any {
    return user;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    request.currentUser = user;

    const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    if (requiredRoles.includes(RolesEnum.Any)) {
      return !!user;
    }
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}

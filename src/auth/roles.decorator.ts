import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from '../users/interfaces/roles.enum';
import { ROLES_KEY } from '../utils/constants';

export const Roles = (...roles: RolesEnum[]) => SetMetadata(ROLES_KEY, roles);

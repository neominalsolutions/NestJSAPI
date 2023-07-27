import { SetMetadata } from '@nestjs/common';
import { RoleTypes } from './role.enum';


export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleTypes[]) => SetMetadata(ROLES_KEY, roles);
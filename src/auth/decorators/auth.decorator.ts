import { SetMetadata, UseGuards } from '@nestjs/common';
import { RoleTypes } from './role.enum';


export const ROLES_KEY = 'roles';

import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/role.guard';

export function Auth(...roles: RoleTypes[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles), // reflector sınıfından metadata bilgisini yakalarız.
    UseGuards(AuthGuard, RolesGuard), // hem auth hem rol guard ile korumaya al
    ApiBearerAuth(), // jwt schema kontrol
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
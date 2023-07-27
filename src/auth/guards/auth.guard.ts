import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/role.decorator';
import { RoleTypes } from '../decorators/role.enum';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../services/jwt.key';
import { Request } from 'express';
import { AccessTokenHelper } from '../utils/token.helper';

@Injectable()
export class AuthGuard implements CanActivate {

  // reflector helper sınıfı ile custom tanımlanmış olan decoratorlara erişim yapıyoruz. 
  constructor(private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = AccessTokenHelper.extractTokenFromHeader(request);

    if (!token) {
      console.log('auth-guard', token);
      throw new UnauthorizedException();
    }

    try {
      await this.jwtService.verifyAsync(token, { publicKey: jwtConstants.secret });
      return true;
    } catch {
      // console.log('not validate token');
      throw new UnauthorizedException(); // 401
    }

  }


}
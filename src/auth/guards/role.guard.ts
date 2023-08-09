import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from '../decorators/auth.decorator';
import { RoleTypes } from '../decorators/role.enum';
import { jwtConstants } from '../services/jwt.key';
import { AccessTokenHelper } from '../utils/token.helper';

@Injectable()
export class RolesGuard implements CanActivate {

  // reflector helper sınıfı ile custom tanımlanmış olan decoratorlara erişim yapıyoruz. 
  constructor(private reflector: Reflector, private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // custom geliştirilen rolleri seçimi ve varsayılan daki user role seçimini ezmek için kullandık
    // const requiredRoles = this.reflector.getAllAndOverride<RoleTypes[]>(ROLES_KEY, [
    //   context.getHandler(), // method
    //   context.getClass(), // controllername
    // ]);
    const requiredRoles = this.reflector.get(ROLES_KEY, context.getHandler()) as any[];

    // RoleTypes tipinde tanımlı bir decorator var mı
    // yoksa demek ki action için bir kontrol mekanizması yok
    console.log('requiredRoles', requiredRoles);

    if (requiredRoles.length == 0) {
      return true;
    } else {

      const request = context.switchToHttp().getRequest();
      const token = AccessTokenHelper.extractTokenFromHeader(request);
  
      console.log('token', token);
  
      if (!token) {
        console.log('token-1', token);
        throw new UnauthorizedException();
      }
  
      try {
        console.log('sadsad');
        const payload = await this.jwtService.verifyAsync(token, { publicKey: jwtConstants.secret });
  
        console.log('payload', payload);
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        const user = payload;
  
        return requiredRoles.some((role) => user.roles?.includes(role));
  
      } catch {
        throw new UnauthorizedException(); // 401
      }
    }
  }
}
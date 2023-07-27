/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { TokenDto } from '../dtos/token.dto';
import { jwtConstants } from './jwt.key';
import { Role } from '../models/role.entity';


@Injectable()
export class AuthService {

  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) { }

  async signIn(email, pass): Promise<TokenDto> {
    const user = await this.usersService.findOneByEmail(email);
    const passHas = await bcrypt.hash(pass, user.passwordSalt);
    console.log('passHas', passHas);

    if (user?.passwordHash !== passHas) {
      throw new UnauthorizedException();
    }
    const roles = user.roles.map((item: Role) => {
      return item.name
    });

    const payload = { sub: user.id, username: user.email, roles: roles };
    console.log('payload', payload);
    const response = new TokenDto();
    response.accessToken = await this.jwtService.signAsync(payload, {
      privateKey: jwtConstants.secret
    });
    return response;
  }

}

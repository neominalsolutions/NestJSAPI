import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDto } from '../dtos/signin.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenDto } from '../dtos/token.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: TokenDto })
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

}

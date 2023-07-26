import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app.service';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/auth/services/user.service';

@Controller()
@ApiTags('app')
export class AppController {
  constructor(private readonly appService: AppService, private readonly userService: UserService) { }

  @Get()
  getHello(): string {
    7
    this.userService.findAll();
    return this.appService.getHello();
  }
}

/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, HttpStatus, Post, Query, Req, Res } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UserCreateDto } from 'src/dtos/user.create.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {

  @Get()
  @ApiQuery({
    name: 'userId',
    required: false,
    type: String,
  })
  getUsers(@Query('userId') userId:string){
    return "ok";
  }

  @Post()
  create(@Body() dto: UserCreateDto, @Res() res: Response) {
    res.status(HttpStatus.CREATED).json(dto);
  }

}

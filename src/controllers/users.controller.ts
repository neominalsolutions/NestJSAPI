/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, HttpStatus, Param, Post, Query, Req, Res } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { FilterDto } from 'src/dtos/filter.dto';
import { UserCreateDto } from 'src/dtos/user.create.dto';
import { User } from 'src/models/user.entity';
import { UserService } from 'src/services/user.service';

@Controller('users')
@ApiTags('users')
export class UsersController {


  constructor(private userService: UserService) { }

  // not query string varsa en başa koyuyoruz yoksa api explorer anlamıyor



  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: Number
  })
  getUserById(@Param() params: any) {
    console.log('userId', params.id);
    return this.userService.findOne(params.id);
  }

  @ApiQuery({
    name: 'page',
    required: false,
    type: Number
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number
  })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    type: Number
  })
  @ApiQuery({
    name: 'searchText',
    required: false,
    type: Number
  })
  @Get()
  getUsers(@Query() query: FilterDto) {
    console.log('query', query);
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() dto: UserCreateDto, @Res() res: Response) {
    var user = new User();
    user.email = dto.email;
    user.userName = dto.username;
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;

    try {
      await this.userService.add(user);
      res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }


  }

}

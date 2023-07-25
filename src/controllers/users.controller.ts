/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
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
  @ApiResponse({
    type: User,
    description:'adsadsa'
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
 
    console.log('userdto', dto);

    try {
      const result = await this.userService.add(dto);
      res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }

}

/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { FilterDto } from 'src/auth/dtos/filter.dto';
import { UserCreateDto } from 'src/auth/dtos/user.create.dto';
import { UserReadDto } from 'src/auth/dtos/user.read.dto';
import { UserService } from 'src/auth/services/user.service';
import { Roles } from '../decorators/role.decorator';
import { RoleTypes } from '../decorators/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/role.guard';


@Controller('users')
@ApiTags('users')
@ApiBearerAuth('access-token') // swagger enable bearer authentication
@UseGuards(AuthGuard)
export class UsersController {

  // NetsJS security dokumanına bakabilirsin.

  constructor(private userService: UserService) { }
  // not query string varsa en başa koyuyoruz yoksa api explorer anlamıyor
  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: Number
  })
  @ApiResponse({
    type: UserReadDto,
    description: 'Users'
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
  @ApiResponse({
    type: UserReadDto,
    description: 'Users'
  })
  @Get()
  getUsers(@Query() query: FilterDto) {
    console.log('query', query);
    return this.userService.findAll();
  }

  @Post()
  @UseGuards(RolesGuard) // global olarak Guardlar uygulansın dediğimiz için tanımlamaya gerek yok.
  @Roles(RoleTypes.Admin) // sadece admin user create edebilir.
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

/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('values')
@ApiTags('values')
export class ValuesController {

  @Get()
  get() {
    return `values`
  }

  @Post()
  create(@Res() res: Response) {
    res.status(HttpStatus.OK).send();
  }

}

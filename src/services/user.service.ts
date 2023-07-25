/*
https://docs.nestjs.com/providers#services
*/

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from 'src/dtos/user.create.dto';
import { UserReadDto } from 'src/dtos/user.read.dto';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepo: Repository<User>,  @InjectMapper() private readonly mapper: Mapper) { }

  async findAll(): Promise<UserReadDto[]> {
    const users = await this.userRepo.find();
    console.log('users', users);
    var userDto =  this.mapper.mapArray(users, User, UserReadDto);
    console.log('userDto', userDto);
    return userDto;
  }

  findOne(id: number): Promise<User | null> {

    
    return this.userRepo.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }

  async add(request: UserCreateDto): Promise<User> {

    var user =  this.mapper.map(request, UserCreateDto, User);
    console.log('user', user);

    const res = await this.userRepo.create(user);
    await this.userRepo.save(request);
    return res;
  }

}

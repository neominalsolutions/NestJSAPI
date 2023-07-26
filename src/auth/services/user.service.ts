/*
https://docs.nestjs.com/providers#services
*/

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from 'src/auth/dtos/user.create.dto';
import { UserReadDto } from 'src/auth/dtos/user.read.dto';
import { User } from 'src/auth/models/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepo: Repository<User>, @InjectMapper() private readonly mapper: Mapper) { }

  async findAll(): Promise<UserReadDto[]> {
    const users = await this.userRepo.find();
    console.log('users', users);
    var userDto = this.mapper.mapArray(users, User, UserReadDto);
    console.log('userDto', userDto);
    return userDto;
  }

  findOneByEmail(email: string): Promise<User | null> {

    return this.userRepo.findOne({ where: { email }, relations: { roles: true } });
  }

  findOne(id: number): Promise<User | null> {

    return this.userRepo.findOne({ where: { id }, relations: { roles: true } });
  }

  async remove(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }

  async add(request: UserCreateDto): Promise<User> {

    var user = this.mapper.map(request, UserCreateDto, User);

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(request.password, salt);

    user.passwordHash = hash;
    user.passwordSalt = salt;


    const res = await this.userRepo.create(user);
    await this.userRepo.save(user);
    return res;
  }

}

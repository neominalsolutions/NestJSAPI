/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepo: Repository<User>) { }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepo.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }

  async add(user: User): Promise<User> {
    const res = await this.userRepo.create(user);
    await this.userRepo.save(user);
    return res;
  }

}

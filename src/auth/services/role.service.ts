import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/auth/models/role.entity";
import { Repository } from "typeorm";

@Injectable()
export class RoleService {

  constructor(@InjectRepository(Role) private roleRepo: Repository<Role>, @InjectMapper() private readonly mapper: Mapper) { }

  async findAll(): Promise<Role[]> {
    const roles = await this.roleRepo.find();

    return roles;
  }

}
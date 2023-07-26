import { Mapper, createMap } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { UserCreateDto } from "src/auth/dtos/user.create.dto";
import { UserReadDto } from "src/auth/dtos/user.read.dto";
import { User } from "src/auth/models/user.entity";

@Injectable()
export class UserMapperProfile extends AutomapperProfile {
  // @InjectMapper dependency injection
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, UserCreateDto, User); // source to destination
      createMap(mapper, User, UserReadDto);
    };
  }
}

// UserMapperProfile sınıfı oluşturup, provider olarak module tanıtıldı.

// Auto Mapper kütüphaneleri
/*

    "@automapper/classes": "^8.7.7",
    "@automapper/core": "^8.7.7",
    "@automapper/nestjs": "^8.7.7",
    "@automapper/types": "^6.3.1",

*/
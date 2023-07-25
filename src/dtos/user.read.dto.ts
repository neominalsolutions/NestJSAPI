import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class UserReadDto {

  @AutoMap()
  @ApiProperty({ description: 'unique id alanı'})
  id:number;

  // default value tanımladık
  @AutoMap()
  @ApiProperty({ description:'kullanici adi' })
  userName: string;

  // description Schemas kısmında görüntüleniyor.

  @AutoMap()
  @ApiProperty({ description:'e-posta' })
  email: string;

  @AutoMap()
  @ApiProperty({ description:'Ad' })
  firstName: string;

  @AutoMap()
  @ApiProperty({ description:'soyad' })
  lastName: string;


}
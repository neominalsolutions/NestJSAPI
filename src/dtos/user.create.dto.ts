import { AutoMap } from "@automapper/classes";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsUrl, } from "class-validator";


export class UserCreateDto {

  // default value tanımladık
  @AutoMap()

  @IsNotEmpty()
  @ApiProperty({ default: '', description:'username field' })
  userName: string;

  // description Schemas kısmında görüntüleniyor.


  @AutoMap()
  @ApiProperty({ default: '' })
  @IsNotEmpty({
    message: 'E-posta boş geçilemez'
  })
  @IsEmail()
  email: string;

  @AutoMap()
  @ApiProperty({ default: '' })
  @IsNotEmpty()
  firstName: string;

  @AutoMap()
  @ApiProperty({ default: '' })
  @IsNotEmpty()
  lastName: string;


  @ApiProperty({ default: 'https://www.a.com' })
  @IsUrl()
  @ApiPropertyOptional() // optional
  url: String;
  // schemas alanını opsiyonel yapmak için kullanılır.
}
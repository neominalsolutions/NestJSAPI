import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsUrl, } from "class-validator";


export class UserCreateDto {

  // default value tanımladık
  @ApiProperty({ default: '' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ default: '' })
  @IsNotEmpty({
    message: 'E-posta boş geçilemez'
  })
  @IsEmail()
  email: string;


  @ApiProperty({ default: '' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ default: '' })
  @IsNotEmpty()
  lastName: string;


  @ApiProperty({ default: 'https://www.a.com' })
  @IsUrl()
  url: String;
}
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsUrl, } from "class-validator";


export class UserCreateDto {

  // default value tanımladık
  @ApiProperty({default:''})
  @IsNotEmpty()
  UserName: string;

  @ApiProperty({default:''})
  @IsNotEmpty({
    message:'E-posta boş geçilemez'
  })
  @IsEmail()
  Email: string;

  @ApiProperty({default:'https://www.a.com'})
  @IsUrl()
  Url:String;
}
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';
import { UserMapperProfile } from 'src/auth/mappers/user.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/models/user.entity';
import { Role } from 'src/auth/models/role.entity';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { jwtConstants } from './services/jwt.key';


@Module({
    imports: [
        JwtModule.register({ // Jwt module dahil ediyoruz.
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'admin',
            database: 'userDb',
            entities: [User, Role],
        }),
        TypeOrmModule.forFeature([User, Role]),
        AutomapperModule.forRoot({
            strategyInitializer: classes()
        })
    ],
    controllers: [
        UsersController, AuthController
    ],
    providers: [UserService, RoleService, UserMapperProfile, AuthService, JwtService],
    exports: [UserService, RoleService, UserMapperProfile]
})
export class AuthModule { }

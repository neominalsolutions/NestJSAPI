import { UserService } from './services/user.service';
import { UsersController } from './controllers/users.controller';
import { ValuesController } from './controllers/values.controller';
import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'userDb',
      entities: [User],
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [
    UsersController,
    ValuesController, AppController],
  providers: [
    UserService, AppService],
})
export class AppModule { }

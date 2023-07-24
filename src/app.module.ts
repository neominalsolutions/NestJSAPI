import { UsersController } from './controllers/users.controller';
import { ValuesController } from './controllers/values.controller';
import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';


@Module({
  imports: [],
  controllers: [
        UsersController, 
    ValuesController, AppController],
  providers: [AppService],
})
export class AppModule { }

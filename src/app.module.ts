

import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app/app.controller';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/role.guard';
import { AuthGuard } from './auth/guards/auth.guard';

@Module({
  imports: [
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

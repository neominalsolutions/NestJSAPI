import { Controller, Get, Inject, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from '../app.service';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/auth/services/user.service';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { CACHE_MANAGER, CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Request } from 'express';
import {Cache} from 'cache-manager';

@Controller()
@ApiTags('app')
export class AppController {
  constructor(private readonly appService: AppService, private readonly userService: UserService, @Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  @Get()
  @UseGuards(ThrottlerGuard) // sadece bu actionda rate limiting uygulamak için
  @Throttle(5,30) // 30sn de 5 request limiti
  getHello(): string {
    this.userService.findAll();
    return this.appService.getHello();
  }

  

  // otomatik cache yapmamızı sağlar
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(20000) // 20 dk olarak ovveride ettik.
  @Get('from-cache')
  async getFromCache(){
    // default ttl değeri 5 dk'dır
    this.cacheManager.set("val-1",{id:1}, 10000);
    const val = await this.cacheManager.get("val-1");
    console.log('cache-manager', val);
    return {id:1,name:'test'};
  }

  @Get('from-session')
  async getFromSession(@Req() request:Request){

    // session bilgilerini req.sessiondan okuyoruz.
    
    if(!request.session['user']){
      console.log('session')
      request.session['user'] = {id:1,name:"deneme"};
    }

    return { session: request.session['user'], id: request.sessionID };
  }
  
}

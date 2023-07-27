

import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app/app.controller';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/role.guard';
import { AuthGuard } from './auth/guards/auth.guard';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    AuthModule,
    ThrottlerModule.forRoot({ // default rate limit ayarları
      ttl: 60, // 1 dk da
      limit: 10, // 10 request
    }),
    CacheModule.register({
      ttl:5000,
      max:10 // maksimum number of items cache
    }) // caching aktif hale getirdik.
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

/*
{ // böyle tanımlayınca tüm module rate limiting uyguuyor
  provide: APP_GUARD,
  useClass: ThrottlerGuard
}
*/

// Not eğer module bazlı bir özellik uygulanırsa @SkipThrottle() ile burada ilgili actionlardan rate limiting özelliği kaldırılır.

// https://medium.com/batech/i%CC%87leri-nodejs-notlar%C4%B1-3-express-g%C3%BCvenli%C4%9Fi-1de52bd114d2
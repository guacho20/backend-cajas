import { Module, Logger, CacheModule, CacheInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuditModule } from './modules/audit/audit.module';
import { CoreModule } from './modules/core/core.module';
import { ReportsModule } from './modules/reports/reports.module';
import { WebModule } from './modules/web/web.module';
import { AuthModule } from './modules/auth/auth.module';
import { MixinSubscriber } from './subscribers/mixin.subscriber';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CacheModule.register({
      ttl: 1,
      max: 20,
    }),
    UserModule,
    AuditModule,
    CoreModule,
    ReportsModule,
    WebModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    MixinSubscriber,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    }
  ],
})
export class AppModule {}

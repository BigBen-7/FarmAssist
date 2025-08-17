import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WeatherModule } from './weather/weather.module';
import { ProcurementModule } from './procurement/procurement.module';
import { HealthModule } from './health/health.module';
import { UtilsModule } from './utils/utils.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HealthInterceptor } from './health/health.interceptor';
import { SuppliersModule } from './suppliers/suppliers.module';
import { UserPreferencesModule } from './user-preferences/user-preferences.module';
import { InventoryTrackingModule } from './inventory-stock/inventory-stock.module';
import { PurchaseRecordingModule } from './purchase-tracking/purchase-tracking.module';

import { AnimalFeedModule } from './animal-feed/animal-feed.module';
import { SoilTypeRegistryModule } from './soil-type-registry/soil-type-registry.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        database: configService.get('DATABASE_NAME'),
        password: configService.get('DATABASE_PASSWORD'),
        username: configService.get('DATABASE_USERNAME'),
        port: +configService.get('DATABASE_PORT'),
        host: configService.get('DATABASE_HOST'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UsersModule,
    AuthModule,
    WeatherModule,
    ProcurementModule,
    HealthModule,
    UtilsModule,
    SuppliersModule,
    UserPreferencesModule,
    InventoryTrackingModule,
    PurchaseRecordingModule,
  AnimalFeedModule,
  SoilTypeRegistryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HealthInterceptor,
    },
  ],
})
export class AppModule {}

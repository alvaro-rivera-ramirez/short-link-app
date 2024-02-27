import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LinksModule } from './links/links.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/database.config';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.develop.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...DataSourceConfig,
      autoLoadEntities: true,
    }),
    UsersModule,
    LinksModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

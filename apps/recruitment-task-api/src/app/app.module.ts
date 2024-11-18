import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity'
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { TwitterIntegrationModule } from '../twitter-integration/twitter-integration.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration available globally
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'password',
      database: 'recruitment-task',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]), 
    UsersModule,
    AuthModule,
    TwitterIntegrationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

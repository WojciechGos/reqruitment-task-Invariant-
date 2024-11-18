import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './users.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { TwitterIntegrationService } from '../twitter-integration/twitter-integration.service';
import { TwitterIntegrationModule } from '../twitter-integration/twitter-integration.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TwitterIntegrationModule],
  providers: [UsersService, TwitterIntegrationService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}

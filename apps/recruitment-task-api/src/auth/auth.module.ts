import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { TwitterStrategy } from './strategies/twitter.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UsersModule,  PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [AuthService, TwitterStrategy, JwtService],
  exports: [AuthService]
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { TwitterStrategy } from './strategies/twitter.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtConstants } from './jwt.constant';
import { TwitterIntegrationModule } from '../twitter-integration/twitter-integration.module';
import { TwitterIntegrationService } from '../twitter-integration/twitter-integration.service';

@Module({
  imports: [
    UsersModule,
    TwitterIntegrationModule,
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5 days' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, TwitterStrategy, JwtStrategy, TwitterIntegrationService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}

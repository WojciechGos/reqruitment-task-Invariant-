import { Controller, Get, Req, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Get('sign-in/twitter')
    @UseGuards(AuthGuard('twitter')) 
    async signIn(){

    }

    @Get('twitter/callback')
    @UseGuards(AuthGuard('twitter')) 
    async twitterAuthCallback(@Req() req) {
      return req.user;
    }

}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { TwitterUserDTO } from './dto/twitter-user.dto';
import { AccessToken } from 'shared/src/lib/accessToken.interface'
import { User } from '../users/users.entity';
import { TwitterIntegrationService } from '../twitter-integration/twitter-integration.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly twitterInegrationService: TwitterIntegrationService 
  ) {}

  async signIn(twitterUserDTO: TwitterUserDTO): Promise<AccessToken> {

    const user: User = await this.usersService.findByEmail(twitterUserDTO.email);


    if(!user){
      await this.usersService.saveTwitterUser(twitterUserDTO);
    }
    else{
      user.token = twitterUserDTO.token
      user.tokenSecret = twitterUserDTO.tokenSecret
      console.log(user)
      await this.usersService.updateUser(user)
    }
    
    const payload = { email: twitterUserDTO.email, username: twitterUserDTO.username };
    
    return {
      value: await this.jwtService.signAsync(payload),
    };
  }


  async getAuthLink(session: Record<string, any>){
    return await this.twitterInegrationService.getOauthLink(session);
  }

  async handleOAuth2Callback(query: any, session: Record<string, any>){
    return await this.twitterInegrationService.handleOAuth2Callback(query, session);
  }
}
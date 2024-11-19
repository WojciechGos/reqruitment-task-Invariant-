import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-twitter';
import { TwitterUserDTO } from '../dto/twitter-user.dto';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor() {   
    super({
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: process.env.TWITTER_CALLBACK_URL,
      includeEmail: true, 
      scope: ['follows.read'],
      
    });
  }

  async validate(token: string, tokenSecret: string, profile: any): Promise<TwitterUserDTO> {
    console.log(token)
    console.log(tokenSecret)
    const { id, username, emails } = profile;
    return {
      twitterId: id,
      username,
      email: emails?.[0]?.value,
      token: token,
      tokenSecret: tokenSecret
    };
  }
}
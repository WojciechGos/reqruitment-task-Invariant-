import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-twitter';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor() {
    console.log( process.env.TWITTER_CONSUMER_KEY)

    super({
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: 'http://localhost:3000/api/auth/twitter/callback',
      includeEmail: true, 
    });
  }

  async validate(token: string, tokenSecret: string, profile: any): Promise<any> {
    console.log( process.env.TWITTER_CONSUMER_KEY);
    const { id, username, emails } = profile;
    return {
      twitterId: id,
      username,
      email: emails?.[0]?.value,
    };
  }
}
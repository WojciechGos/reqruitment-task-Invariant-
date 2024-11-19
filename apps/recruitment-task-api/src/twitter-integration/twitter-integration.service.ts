import { Injectable } from '@nestjs/common';
import { TwitterApi } from 'twitter-api-v2';
import { User } from '../users/users.entity';

@Injectable()
export class TwitterIntegrationService {
    private twitterClient: TwitterApi;

    constructor() {
        this.twitterClient = new TwitterApi({
            appKey: process.env.TWITTER_API_KEY,
            appSecret: process.env.TWITTER_API_SECRET,
            accessToken: process.env.TWITTER_ACCESS_TOKEN,
            accessSecret: process.env.TWITTER_ACCESS_SECRET
        });
    }

    async getOauthLink(session: Record<string, any>){
        const client = new TwitterApi({
            clientId: process.env.TWITTER_OAUTH2_CLIENT_ID , 
            clientSecret: process.env.TWITTER_OAUTH2_CLIENT_SECRET_ID
        })
        const { url, codeVerifier, state } = client.generateOAuth2AuthLink(process.env.TWITTER_CALLBACK_URL, { scope: ['follows.read', 'offline.access'] });

        session.codeVerifier = codeVerifier;
        session.state = state;

        console.log(codeVerifier)
        console.log(state)

        
        return url;
    }

    async handleOAuth2Callback(query: any, session: Record<string, any>) {
        const { code, state } = query;
        console.log(code)
        console.log(state)
    
        if (!session.codeVerifier || !session.state || session.state !== state || !code) {
          throw new Error('Invalid session or query parameters.');
        }
    
        const client = new TwitterApi({
            clientId: process.env.TWITTER_API_KEY, 
            clientSecret: process.env.TWITTER_API_SECRET
        });
    
        const { client: loggedClient, accessToken, refreshToken } = await client.loginWithOAuth2({
          code,
          codeVerifier: session.codeVerifier,
          redirectUri: process.env.TWITTER_CALLBACK_URL,
        });
        const { data: userObject } = await loggedClient.v2.me();
        console.log(userObject)
        
        console.log(loggedClient)
        console.log(accessToken)
        console.log(refreshToken)
        // Return the authenticated client and tokens
        return { loggedClient, accessToken, refreshToken };
    }

    private createAuthenticatedClient(accessToken: string, accessSecret: string): TwitterApi {
        return new TwitterApi({
            appKey: process.env.TWITTER_API_KEY,
            appSecret: process.env.TWITTER_API_SECRET,
            accessToken,
            accessSecret,
        });
    }

    async checkUserFollowsAccount(systemUser: User, targetUsername: string): Promise<boolean> {
        try {
            const authenticatedClient = new TwitterApi({
                appKey: process.env.TWITTER_CONSUMER_KEY,
                appSecret: process.env.TWITTER_CONSUMER_SECRET,
                accessToken: systemUser.token,
                accessSecret: systemUser.tokenSecret
            });
            // const authenticatedClient = this.createAuthenticatedClient(systemUser.token, systemUser.tokenSecret)

            // const client = await authenticatedClient.login()
            const user = await authenticatedClient.v2.userByUsername(systemUser.username);
            const targetUser = await authenticatedClient.v2.userByUsername(targetUsername);

            if (!user?.data || !targetUser?.data) {
                throw new Error('User or target user not found');
            }

            const userId = user.data.id;
            const targetUserId = targetUser.data.id;

            const follows = await authenticatedClient.v2.following(userId);

            if (!follows?.data) {
                throw new Error('No following data available');
            }

            // Check if the user follows the target user
            const isFollowing = follows.data.some(following => following.id === targetUserId);
            return isFollowing;
        } catch (error) {
            // Log detailed error and rethrow with user-friendly message
            console.error('Error checking follow status:', error);
            if (error.response) {
                console.error('API Response:', error.response.data);
            }
            throw new Error('Could not check follow status');
        }
    }
    
}

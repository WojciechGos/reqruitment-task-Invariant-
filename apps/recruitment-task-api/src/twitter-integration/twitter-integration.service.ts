import { Injectable } from '@nestjs/common';
import { TwitterApi } from 'twitter-api-v2';

@Injectable()
export class TwitterIntegrationService {
    private twitterClient: TwitterApi;

    constructor() {
        this.twitterClient = new TwitterApi({
            appKey: process.env.TWITTER_API_KEY,
            appSecret: process.env.TWITTER_API_SECRET,
            accessToken: process.env.TWITTER_ACCESS_TOKEN,
            accessSecret: process.env.TWITTER_ACCESS_SECRET,
        });
    }

    async checkUserFollowsAccount(username: string, targetUsername: string): Promise<boolean> {
        try {
            const user = await this.twitterClient.v2.userByUsername(username);
            const targetUser = await this.twitterClient.v2.userByUsername(targetUsername);

            if (!user || !targetUser) {
                throw new Error('User or target user not found');
            }

            const userId = user.data.id;
            const targetUserId = targetUser.data.id;

            const follows = await this.twitterClient.v2.following(userId);

            return follows.data.some(following => following.id === targetUserId);
        } catch (error) {
            console.error('Error checking follow status:', error.message);
            throw new Error('Could not check follow status');
        }
    }
}

import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { TwitterApi } from 'twitter-api-v2';

@Controller('auth')
export class AuthController {

  // Step 1: Generate the auth link to redirect the user to Twitter for authorization
  @Get('sign-in/twitter')
  async signIn(@Req() req, @Res() res) {
    // Initialize the Twitter client with your app's credentials
    const client = new TwitterApi({
      appKey: process.env.TWITTER_CONSUMER_KEY,
      appSecret: process.env.TWITTER_CONSUMER_SECRET,
    });

    try {
      // Generate the OAuth 1.0a request token and the corresponding authorization URL
      const authLink = await client.generateAuthLink(process.env.TWITTER_CALLBACK_URL,  { linkMode: 'authorize' });

      // Store the oauth_token_secret in the session for later use
      req.session.oauth_token_secret = authLink.oauth_token_secret;

      // Redirect the user to the Twitter authorization URL
      return res.redirect(authLink.url);
    } catch (error) {
      console.error('Error generating OAuth link:', error);
      return res.status(500).send('Internal Server Error');
    }
  }

  // Step 2: Handle the callback when Twitter redirects the user back to your site
  @Get('twitter/callback')
  async twitterAuthCallback(@Query() query, @Req() req, @Res() res) {
    const { oauth_token, oauth_verifier } = query;

    // Retrieve the saved oauth_token_secret from the session
    const { oauth_token_secret } = req.session;
    console.log("oauth_token_secret " + oauth_token_secret)

    // Validate the presence of required tokens
    if (!oauth_token || !oauth_verifier || !oauth_token_secret) {
      return res.status(400).send('Missing parameters or session expired!');
    }

    // Initialize the Twitter client with your app's credentials
    const client = new TwitterApi({
      appKey: process.env.TWITTER_CONSUMER_KEY,
      appSecret: process.env.TWITTER_CONSUMER_SECRET,
      accessToken: oauth_token,
      accessSecret: oauth_token_secret
    });
    console.log("oauth_token: "+ oauth_token)
    console.log("oauth_token_secret: "+ oauth_token_secret)

    try {
      // Use the oauth_token, oauth_token_secret, and oauth_verifier to obtain the access token
      const { client: loggedClient, accessToken, accessSecret } = await client.login(oauth_verifier);

      // Store the access token and access secret securely (session or database)
      req.session.accessToken = accessToken;
      req.session.accessSecret = accessSecret;
      console.log(accessToken)
      console.log(accessSecret)

      // Fetch the authenticated user's details (optional)
      const { data: userObject } = await loggedClient.v2.me();

      // Return the access token and user details
      return res.json({ accessToken, userObject });
    } catch (error) {
      console.error('Error during OAuth token exchange:', error);
      return res.status(403).send('OAuth token exchange failed. Invalid token or verifier!');
    }
  }
}

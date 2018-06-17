import GoogleStrategy from 'passport-google-oauth20';

import { CONFIG } from '../configs/app.config';

export const Google = new GoogleStrategy(
  {
    clientID: CONFIG.GOOGLE.clientID,
    clientSecret: CONFIG.GOOGLE.clientSecret,
    callbackURL: CONFIG.GOOGLE.callbackURL,
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  },
);
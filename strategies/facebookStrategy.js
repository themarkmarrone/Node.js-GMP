import FacebookStrategy from 'passport-facebook';

import { CONFIG } from '../configs/app.config';

export const Facebook = new FacebookStrategy(
  {
    clientID: CONFIG.FACEBOOK.clientID,
    clientSecret: CONFIG.FACEBOOK.clientSecret,
    callbackURL: CONFIG.FACEBOOK.callbackURL,
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  },
);

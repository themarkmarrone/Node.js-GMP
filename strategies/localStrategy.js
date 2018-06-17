import LocalStrategy from 'passport-local';

import { findAll } from '../controllers/base';

const credentialsPath = './models/credentials.json';

export const Local = new LocalStrategy(
  {
    usernameField: 'login',
    passwordField: 'password',
    session: false,
  },
  async function(username, password, done) {
    const content = await findAll(credentialsPath);
    const user = JSON.parse(content.toString())[username];

    if (user === undefined) {
      done(null, false);
    } else if (user.password !== password) {
      done(null, false);
    } else {
      done(null, user);
    }
  },
);

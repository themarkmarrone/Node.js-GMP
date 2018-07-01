export const CONFIG = {
  DEFAULT_PORT: 8080,

  MONGO: {
    url: 'mongodb://localhost:27017/homework',
    db: 'homework',
  },

  SECRET: 'secretWord',

  FACEBOOK: {
    clientID: '1976816615726629',
    clientSecret: '1b5d467f6067bcb9fd301fcf337a3f41',
    callbackURL: `http://localhost:8080/auth/facebook/return`,
  },

  GOOGLE: {
    clientID: '392563224650-h0t7b29268outrenvkp6rmukk658e8eb.apps.googleusercontent.com',
    clientSecret: 'iVzNqCGIgfrf7bjD8Y5D_qvG',
    callbackURL: `http://localhost:8080/auth/google/return`,
  },

  TWITTER: {
    consumerKey: 'QjLdI3qbSkIbtYF87TVK2uBSX',
    consumerSecret: 'MN7XCBU4fIB1wnENYj7s18yz7LFRh5vDXszzc6O1KkQIsXz2Bc',
    callbackURL: `http://localhost:8080/auth/twitter/return`,
  },
};

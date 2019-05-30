const config = require('config');
const passport = require('passport');
const {Strategy: GoogleStrategy} = require('passport-google-oauth20');
const {has} = require('lodash');
const {createAbilities} = require('./authentication/abilities');

module.exports = keystone => {
  const User = keystone.list('User').model;

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  async function createOrFindUser(newUser, providerMethod) {
    let storedUser;

    try {
      if (newUser.id) {
        storedUser = await User.findById(newUser.id);
      } else if (has(newUser, providerMethod)) {
        storedUser = await User.findOne({
          [providerMethod]: newUser[providerMethod]
        });
      }

      if (!storedUser && newUser.email) {
        storedUser = await User.findOne({
          email: newUser.email
        });
      }

      if (!has(storedUser, providerMethod)) {
        return storedUser.set({
          [providerMethod]: newUser[providerMethod]
        });
      }

      if (storedUser) {
        return storedUser;
      }
    } catch (error) {
      if (newUser.id) {
        console.error(error);
        throw new Error(`No user found for id ${newUser.id}.`);
      }

      console.log(newUser);

      return new User(newUser).save();
    }
  }

  // Set up Google login
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.get('GOOGLE_OAUTH_CLIENT_ID'),
        clientSecret: config.get('GOOGLE_OAUTH_CLIENT_SECRET'),
        callbackURL: '/auth/google/callback'
      },
      async (token, tokenSecret, profile, done) => {
        console.log(profile);
        const user = {
          providerId: null,
          googleProviderId: profile.id,
          username: null,
          name: {
            first:
              profile.name && profile.name.givenName
                ? profile.name.givenName
                : '',
            last:
              profile.name && profile.name.familyName
                ? profile.name.familyName
                : ''
          },
          description: profile.tagline ? profile.tagline : '',
          email:
            (profile.emails &&
              profile.emails.length > 0 &&
              profile.emails[0].value) ||
            null,
          profilePhoto:
            (profile.photos &&
              profile.photos.length > 0 &&
              profile.photos[0].value) ||
            null,
          coverPhoto:
            profile._json.cover &&
            profile._json.cover.coverPhoto &&
            profile._json.cover.coverPhoto.url
              ? profile._json.cover.coverPhoto.url
              : '',
          website:
            profile._json.urls && profile._json.urls.length > 0
              ? profile._json.urls[0].value
              : '',
          createdAt: new Date(),
          lastSeen: new Date()
        };

        try {
          done(null, await createOrFindUser(user, 'googleProviderId'));
        } catch (error) {
          done(error);
        }
      }
    )
  );

  return [passport.initialize(), passport.session(), createAbilities];
};

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("./model/user.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      scope: ["email", "profile"],
    },
    async function (accessToken, refreshToken, profile, done) {
      let user = await User.findOne({ email: profile.emails[0].value });
      if (!user) {
        user = User.create({
          username: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
        });
        await user.save();
      }
      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

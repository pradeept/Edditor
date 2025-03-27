import { configDotenv } from "dotenv"
import passport from "passport"
import GoogleStrategy from "passport-google-oauth2"
configDotenv()


passport.use(new GoogleStrategy.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CB_URL,
    passReqToCallback: true,
    proxy: true
},
    function (request, accessToken, refreshToken, profile, done) {
        console.log(profile)
        return done(null, profile)
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //     return done(err, user);
        // });
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})
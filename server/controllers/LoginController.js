import passport from "passport"

const googleAuth =  passport.authenticate('google', {
        scope: ['email', 'profile'],
    })


const googleCallback = passport.authenticate('google', {
    successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failure'
})


const OauthSuccess = (req, res) => {
    // Set jwt token here
    res.redirect(`${process.env.CLIENT_HOST}/home`);
}

export { googleAuth, googleCallback, OauthSuccess }
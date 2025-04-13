import passport from "passport";


// NOTE: Passport stratergy is defined in /utils/passPortUtil.js & called in server.js


const googleAuth = passport.authenticate('google', {
    scope: ['email', 'profile'],
})

// Google callback handler.
const googleCallback = passport.authenticate('google', {
    successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failure'
})

// On successful Oauth completion.
const OauthSuccess = (req, res) => {
    res.redirect(`${process.env.CLIENT_HOST}/home`);
}

// On Oauth failure redirect to CLIENT_HOST/ .
const OauthFailure = (req, res) => {
    res.redirect(`${process.env.CLIENT_HOST}/`)
}

// Logout handler.
const logOut = (req, res) => {
    req.logout(function (err) {
        if (err)
            console.log(err)
        else
            res.status(200).json({ "msg": "Logged out!" })
    });
}


export { googleAuth, googleCallback, OauthSuccess, OauthFailure, logOut }
import passport from "passport";


// NOTE: Passport stratergy is defined in /utils/passPortUtil.js & called in server.js


const googleAuth = passport.authenticate('google', {
    /* IMP - drive scope is sensitive and requires developer to publish his app.
            or add other users email who can allow themselves to make api calls to drive.
            https://console.cloud.google.com/auth/audience
          - To ask drive scope from a edditor user developer first has to enable Drive API in GCP/api

       Option 1: For now I've added my personal email ID's hence only those email ids will be able to make 
           drive call.
       NOTE: apart from developer users don't have to enable their drive api in console.
       
       Option 2: To publish dev need to verify - https://support.google.com/cloud/answer/9110914
    */
    scope: ['email', 'profile', "https://www.googleapis.com/auth/drive"],
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
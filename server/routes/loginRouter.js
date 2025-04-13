import { Router } from "express"
import { googleAuth, googleCallback, logOut, OauthSuccess, OauthFailure } from "../controllers/LoginController.js"

const loginRouter = Router()
/*
    Google Oauth & logout routes.
    Logic can be found in /controllers/loginController.js .
*/
loginRouter.get('/google/', googleAuth)
loginRouter.get("/google/callback", googleCallback)
loginRouter.get("/google/success", OauthSuccess)
loginRouter.get("/auth/google/failure", OauthFailure)
loginRouter.get('/logout',logOut)
export { loginRouter }
import { Router } from "express"
import { googleAuth, googleCallback, OauthSuccess } from "../controllers/LoginController.js"
import passport from "passport";

const loginRouter = Router()

loginRouter.get('/google/', googleAuth)
loginRouter.get("/google/callback", googleCallback)
loginRouter.get("/google/success", OauthSuccess)
export { loginRouter }
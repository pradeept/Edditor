import { Router } from "express";
import { homeController } from "../controllers/homeController.js";
import { isAuthenticated } from "../utils/isAuth.js";

const homeRouter = Router();

homeRouter.get('/',isAuthenticated, homeController)

export {homeRouter}
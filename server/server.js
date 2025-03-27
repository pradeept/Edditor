configDotenv()
import express from "express"
import bodyParser from "body-parser"
import "./utils/passPortUtil.js"
import { configDotenv } from "dotenv";
import { loginRouter } from "./routes/loginRouter.js";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { homeRouter } from "./routes/homeRouter.js";
import { isAuthenticated } from "./utils/isAuth.js";

const app = express();

app.use(cors({
    origin: [process.env.SERVER_HOST, process.env.CLIENT_HOST],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Access-Control-Allow-Origin'],
    credentials: true,
}))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.urlencoded({ extended: true }))


app.use('/auth', loginRouter);
app.use('/home', isAuthenticated, homeRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server listening at ${process.env.PORT}`)
})
import express, { Locals, NextFunction, Response, Request } from "express";
import cors, { CorsOptions } from "cors";
import todoRoute from "./router/todo.route";
import userRoute from "./router/user.route";
import path from "path";
import { connect } from "./database/db";
import passport from "passport";
import session, { SessionOptions, CookieOptions } from "express-session";
import MongoStore from "connect-mongo";
import { env } from "process";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import "./middleware/passport.middleware";

const app = express();

const corsOption: CorsOptions = {
  origin: env.CLI_URL,
  credentials: true,
};

app.use(cors(corsOption));

app.use(express.json());

const SECRET: string = process.env.COOKIE_SECRET;
const DB_URL: string = process.env.DB_URL;

var cookieOpt: CookieOptions = {
  maxAge: 604800000,
  sameSite: "strict",
  secure: false,
};

var sess: SessionOptions = {
  resave: false,
  saveUninitialized: false,
  secret: SECRET,
  store: new MongoStore({
    mongoUrl: DB_URL,
    ttl: 14 * 24 * 60 * 60, // 14 days
  }),
  cookie: cookieOpt,
};

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
  cookieOpt.sameSite = "none";
  cookieOpt.secure = true;
}

app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/api/v1/google",
  (req, res, next) => {
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  },
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/api/v1/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${env.CLI_URL}/`,
  }),
  function (req, res) {
    res.redirect(`${env.CLI_URL}/`);
  }
);

app.use("/api/v1/", todoRoute);
app.use("/api/v1/", userRoute);

app.get(
  "/",
  (
    req: Request<string, any>,
    res: Response<string, Locals>,
    next: NextFunction
  ) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.send("hi");
  }
);

connect(DB_URL).then(() => {
  app.listen(env.PORT, () => {
    console.log(`Server running at http://localhost:${env.PORT}`);
  });
});

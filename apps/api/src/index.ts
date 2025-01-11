import express, { json } from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import "dotenv/config";
import "./config/passport";
import cookieParser from "cookie-parser";//parse a very long cookie string and return a JavaScript object
const app = express();
const port = 3000;
app
  .use(cookieParser())
  .use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  )
  .use(json())
  .use(
    session({
      secret: process.env.SESSION_SECRET || "",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
      },
    })
  )
  .use(passport.initialize())
  .use(passport.session());

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
import { authRouter } from "./routes/auth.routes";
import { isAuthenticated } from "./middleware/isAuthenticated";
import { onRampRouter } from "./routes/onRamp.routes";
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/transactions", onRampRouter);
app.get("/test", (req, res) => {
  res.sendFile(__dirname + "/test.html");
});
app.get("/session-info", isAuthenticated, (req, res) => {
  res.json({
    message: "user have below session",
    session: req.session,
    user: req.user,
  });
});
app.listen(port, () => {
  console.log(`App is listening on Port: ${port}`);
});

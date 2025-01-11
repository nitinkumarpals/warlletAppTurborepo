import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma, User } from "@repo/db/client";
import { login, loginWithGoogle } from "../controllers/authController";
import { error } from "console";
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    login
  )
);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: "http://localhost:3000/api/v1/auth/callback",
    },
    loginWithGoogle
  )
);
passport.serializeUser((user: any, done) => {
  console.log("inside serializeUser");
  console.log(user);
  if (user) {
    return done(null, user.id);
  }
  return done(error, false);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    console.log("inside deserializeUser");
    console.log(`inside deserializeUser with id: ${id}`);
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (user) {
      return done(null, user); // Make sure the user object is valid
    } else {
      return done(null, false); // User not found
    }
  } catch (error) {
    return done(error);
  }
});

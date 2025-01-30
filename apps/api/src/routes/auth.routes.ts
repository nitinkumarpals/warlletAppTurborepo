import { Router } from "express";
import { registerUser } from "../controllers/authController";
import { Request, Response } from "express";
import passport from "passport";
import { User } from "@repo/db/client";
export const authRouter = Router();
authRouter.post("/signup", registerUser);

authRouter.get(
  "/authGoogle",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get(
  "/callback",
  passport.authenticate("google", { failureMessage: "failed" }),
  (req, res) => {
    const { password, ...userData } = req.user as User;
    res.redirect("http://localhost:3001/");
  }
);
// authRouter.post('/login',passport.authenticate('local'),(req,res)=>{
//     const { password, ...userData } = req.user as User;
//     res.status(200).json({
//       message: "Login successful",
//       user: userData,
//     });
// })
authRouter.post("/login", (req: Request, res: Response, next) => {
  passport.authenticate(
    "local",
    (
      err: Error | null,
      user: User | false,
      info?: { message: string } | undefined
    ) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "An error occurred", error: err.message });
      }
      if (!user) {
        return res
          .status(401)
          .json({ message: info?.message || "Authentication failed" });
      }
      req.login(user, { session: true }, (loginErr) => {
        if (loginErr) {
          return res
            .status(500)
            .json({ message: "Login failed", error: loginErr.message });
        }
        const { password, ...userData } = req.user as User;
        return res.status(200).json({
          message: "Login successful",
          user: userData,
        });
      });
    }
  )(req, res, next);
});

authRouter.get("/logout", (req, res) => {
  if(!req.user){
     res.status(401).json({ message: "User is not authenticated" });
     return;
  }
  req.logout((err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Logout failed", error: err.message });
    }
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to destroy session", error: err.message });
      }

      res.clearCookie("connect.sid", { path: "/" });
      res.status(200).json({ message: "Logout successful" });
    });
  });
});

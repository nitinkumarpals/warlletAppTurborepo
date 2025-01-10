import { Request, Response } from "express";

export const isAuthenticated = (
  req: Request,
  res: Response,
  done:any
) => {
  const user = req.user;
  console.log("Session at session-info:", req.session);
  console.log("User at session-info:", req.user);
  if (user) {
    return done();
  }
  res.status(401).json({
    message: "user is not authenticated",
  });

};

import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const adminOnly = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Admin Access Only",
    });
  }
};
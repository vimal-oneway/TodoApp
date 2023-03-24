import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import { ErrorHandler } from "../utils/ErrorHandler";

export const login = async (
  req: Request<string, any>,
  res: Response<any>,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.session?.passport.user);
    if (!user) {
      next(new ErrorHandler("please Login", 401));
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

export const logout = async (
  req: Request<string, any>,
  res: Response<string, any>,
  next: NextFunction
) => {
  req.logout((err) => {
    if (!err) {
      return res.status(200).json(
        JSON.stringify({
          success: true,
          message: "Logout successfully",
        })
      );
    }
    return res.status(200).json(
      JSON.stringify({
        success: false,
        message: "Logout failed",
      })
    );
  });
};

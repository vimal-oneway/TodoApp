import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "./catchAsyncErrors";
import { ErrorHandler } from "../utils/ErrorHandler";
import User from "../models/user.model";

export const isAuthenticatedUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.session.passport?.user;
      if (!token) {
        return next(new ErrorHandler("Please Login", 401));
      }
      req.body.userId = token;
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        msg: `Login first:)`,
      });
    }
  }
);

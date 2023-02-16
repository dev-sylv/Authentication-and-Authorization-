import { Request, Response, NextFunction } from "express";
import { authRole } from "../Constants/users.constants";
import { IAuthUser, IUser } from "../Models/AllInterfaces";
import { AppError, HttpCode } from "../Utils/AppError";

export const isAdmin = (
    req: Request<{}, {}, IAuthUser>,
    res: Response,
    next: NextFunction
  ) => {
    const user = req!.user as IUser;
  
    const adminUser = user && user.role === authRole.admin;
    if (!adminUser) {
      next(
        new AppError({
          message: "Unauthorized admin user",
          httpCode: HttpCode.UNAUTHORIZED,
        })
      );
    }
  
    next();
  };


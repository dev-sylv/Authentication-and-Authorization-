import { Request, Response, NextFunction } from "express";
import { AppError, HttpCode } from "../Utils/AppError";

export const isAdmin = async(req: AuthUser, res: Response, next: NextFunction) =>{
    const user = req!.user

    const adminUser = user && user.role === "admin";
    if (!adminUser) {
        next(
            new AppError({
                message: "Unauthorized admin ",
                httpCode : HttpCode.BAD_REQUEST
            })
        )
    }
}


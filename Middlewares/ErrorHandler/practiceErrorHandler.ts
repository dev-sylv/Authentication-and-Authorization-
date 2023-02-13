import { Request , Response , NextFunction } from "express";
import { AppError, HttpCode } from "../../Utils/AppError";

export const DevErrorHandler = (err:AppError , res:Response) =>{
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        error : err,
        httpcode : err.httpCode,
        name : err.name,
        stack : err.stack
    })
}

export const ErrorHandler = (err:AppError , req:Request , res:Response , next : NextFunction) =>{
    DevErrorHandler(err , res)
}
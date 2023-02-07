import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload, Secret, VerifyErrors } from "jsonwebtoken";
import { UserData } from "../../Models/AllInterfaces";
import userModel from "../../Models/user.models";
import { AppError, HttpCode } from "../../Utils/AppError";

interface Payload extends JwtPayload {
    _id: string,
    email: string
};

const secret = "suuvicodoiejeifivodufv"

export const GenerateToken = (user: Payload) =>{
    return jwt.sign(user, secret as Secret, {expiresIn : "1h"})
};

// Verify and authorize the user

export const UserAuth = (req: Request, res: Response, next: NextFunction) =>{
    // Make request for our token from our headers
    const headers = req.headers['authorization'];

    if (!headers || !headers.startsWith("Bearer ")) {
        next(
            new AppError({
                message: "You are not unathorized",
                httpCode: HttpCode.UNAUTHORIZED
            })
        )
    }

    const token: string = headers!.split(" ")[1];

    // Verify the token payload
    jwt.verify(token, secret as Secret, async(
        err: VerifyErrors | null,
        decodedUser: any
    ) =>{
        if (err) {
            const errorMsg =
             err.name === "JsonWebTokenError" ? "Invalid token, you are not authorized" : err.message;
             next(
                new AppError({
                    httpCode: HttpCode.UNAUTHORIZED,
                    message: errorMsg,
                })
             )
        }
        try {
            const verifiedUsers = await userModel.findOne({_id: decodedUser._id})
            if (!verifiedUsers) {
                next(
                    new AppError({
                        httpCode: HttpCode.UNAUTHORIZED,
                        message: "Unauthorized User"
                    })
                )
            }
            req!.user = verifiedUsers as UserData
            next()
        } catch (error: any) {
            next(
                new AppError({
                    httpCode: HttpCode.INTERNAL_SERVER_ERROR,
                    message: error
                })
            )
        }
    })
}
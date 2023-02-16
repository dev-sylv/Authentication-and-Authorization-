import jwt, { JwtPayload, Secret, VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AppError, HttpCode } from "../Utils/AppError";
import UserModel from "../Models/user.models";
import crypto from "crypto";
import { envVariables } from "../Config/environmentVariables";


interface Payload extends JwtPayload {
  _id: string;
  email: string;
}

const secret = envVariables.JWT_SECRET_KEY;

console.log(secret);
export const generateToken = (user: Payload) => {
  return jwt.sign(user, secret as Secret, { expiresIn: "1h" });
};

// verify and authorize the user

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
  // make request for our token from the headers

  const headers = req.headers.authorization;
  if (!headers || !headers.startsWith("Bearer ")) {
    next(
      new AppError({
        httpCode: HttpCode.UNAUTHORIZED,
        message: "You are not authorized",
      })
    );
  }

  const token: string = headers!.split(" ")[1];

  // verify the token payload
  jwt.verify(
    token,
    secret as Secret,
    async (err: VerifyErrors | null, decodedUser: any) => {
      if (err) {
        const errorMsg =
          err.name === "JsonWebTokenError"
            ? "Invalid token, you are Unauthorized"
            : err.message;
        next(
          new AppError({
            httpCode: HttpCode.UNAUTHORIZED,
            message: errorMsg,
          })
        );
      }
      try {
        const verifiedUser = await UserModel.findOne({ _id: decodedUser!._id });
        if (!verifiedUser) {
          next(
            new AppError({
              httpCode: HttpCode.UNAUTHORIZED,
              message: "Unauthorized user",
            })
          );
        }

        req!.user = verifiedUser as IUser;
        next();
      } catch (error: any) {
        next(
          new AppError({
            httpCode: HttpCode.INTERNAL_SERVER_ERROR,
            message: error,
          })
        );
      }
    }
  );
};

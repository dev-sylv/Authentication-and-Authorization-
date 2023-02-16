import { NextFunction, Request, Response } from "express";
import { AsyncHandler } from "../Utils/AsyncHandler";
import userModel from "../Models/user.models";
import bcrypt from "bcrypt";
import { AppError, HttpCode } from "../Utils/AppError";
import { GenerateToken } from "../Middlewares/JsonWebToken/user.auth";
import { IUser } from "../Models/AllInterfaces";

// Register Users:
export const RegisterUsers = AsyncHandler(
  async (
    req: Request<{}, {}>,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { name, email, password, confirmPassword } = req.body;
    const salt: string = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const createUser = await userModel.create({
      name,
      email,
      password: hash,
      confirmPassword: hash,
    });

    if (!createUser)
      next(
        new AppError({
          message: "Account Not created",
          httpCode: HttpCode.BAD_REQUEST,
        })
      );

    return res.status(200).json({
      message: "Successfully Created",
      data: createUser,
    });
  }
);

// users login
export const login = AsyncHandler(
  async (
    req: Request<{}, {}, IUser>,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { email, password } = req.body;

    if (!email || !password) {
      next(
        new AppError({
          message: "Please provide email and password",
          httpCode: HttpCode.BAD_REQUEST,
        })
      );
    }

    const user = await userModel.findOne({ email });
    const checkPassword = await bcrypt.compare(password, user!.password);

    if (!checkPassword) {
      next(
        new AppError({
          message: "Invalid password or email",
          httpCode: HttpCode.UNAUTHORIZED,
        })
      );
    }

    const token = GenerateToken({ email: user!.email, _id: user!._id });
    return res.status(HttpCode.OK).json({
      message: `${user!.name}, you are welcome`,
      token,
    });
  }
);

// Get users:
export const GetUsers = AsyncHandler(
  async(req: Request, res: Response, next: NextFunction): Promise<Response> =>{
    const users = await userModel.find();
    return res.status(HttpCode.OK).json({
      message: "Welcome",
      data: users
    })
  }
)
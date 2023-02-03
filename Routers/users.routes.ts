import { Router } from "express";
import { GetUsers, login, RegisterUsers } from "../Controllers/user.controller";
import { UserAuth } from "../Middlewares/JsonWebToken/user.auth";
import {
  LoginValidation,
  RegisterValidation,
} from "../Middlewares/Validation/UserValidation/UserValidation";

const route = Router();

route.route("/register").post(RegisterValidation, RegisterUsers);
route.route("/login").post(LoginValidation, login);
route.route("/").get(UserAuth, GetUsers)


export default route
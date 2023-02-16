import { NextFunction, Request, Response, RequestHandler } from "express";
import { ProductSchemaValidation } from "./ProductsSchema";
import { validator } from "../Validator";

export const PostProductsValidation: RequestHandler = (
    req: Request, res: Response, next: NextFunction
) =>{
    validator(ProductSchemaValidation.Products, req.body, next)
};

export const AdminLoginValidation: RequestHandler = (
    req: Request, res: Response, next: NextFunction
) =>{
    validator(ProductSchemaValidation.AdminLogin, req.body, next)
}
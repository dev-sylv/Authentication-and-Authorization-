import { Request, Response, NextFunction } from "express";
import ProductModel from "../Models/products.models";
import { AppError, HttpCode } from "../Utils/AppError";
import { AsyncHandler } from "../Utils/AsyncHandler";

// post products
export const postProducts = AsyncHandler(
    async(req: Request, res: Response, next: NextFunction): Promise<Response> =>{
        const {name , productImage , price , category} = req.body;
        const product = await ProductModel.create({name, productImage, price, category});
            if(!product){
                next(new AppError ({
                    message : "Product not found",
                    httpCode : HttpCode.BAD_REQUEST
    }))
}
        return res.status(201).json({
        message : "Product created successfully",
        data : product
}) 
    }
)

// get products:
export const GetProducts = AsyncHandler(
    async(req:Request , res : Response , next: NextFunction) =>{
        const products = await ProductModel.find();

        if(!products){
            next(new AppError ({
                message : "Product not found",
                httpCode : HttpCode.BAD_REQUEST
            }))
        }

        return res.status(200).json({
            message : "Products fetched successfully",
            data : products
        })
    }
)
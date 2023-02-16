import { Document, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    // cart?: {
    //   items: {
    //     productId: Schema.Types.ObjectId;
    //     quantity: number;
    //   };
    // }[];
    role: string;
  }
  
  export interface IAuthUser extends Request {
    user: IUser;
  }

export interface Review{
    user: Schema.Types.ObjectId,
    name: string,
    rating: number,
    comment: string
}

export interface ProductData extends Document{
    name: string;
    price: number;
    category: string;
    rating: number;
    productImage: string;
    numberOfReviews: number;
    reviews: Review[]
}
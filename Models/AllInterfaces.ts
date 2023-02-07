import { Document, Schema } from "mongoose";

export interface UserData extends Document {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    cart: {
        items: {
            products: Schema.Types.ObjectId;
        };
        quantity: number;
    }[];
    role: string;
};

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
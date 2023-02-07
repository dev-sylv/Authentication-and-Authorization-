
import { Schema, model } from "mongoose";

import { ProductData } from "./AllInterfaces";

interface Products extends Document, ProductData{};

const ProductSchema: Schema<Products> = new Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"]
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"]
    },
    productImage: {
        type: String,
        required: [true, "Please enter product image"]
    },
    category: {
        type: String,
        required: [true, "Please enter product category e.g Fashion, Food"]
    },
    rating: {
        type: Number,
        default: 0,
    },
    numberOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            rating: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            comment: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            
        }
    ]
}, {
    versionKey: false,
    timestamps: true
});

const ProductModel = model<Products>("Products Collection", ProductSchema);

export default ProductModel;
import { model, Schema, Document } from "mongoose";
import isEmail from "validator/lib/isEmail";

import { UserData } from "./AllInterfaces";

interface Users extends Document, UserData{};

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        lowercase: true,
        unique: true,
        trim: true,
        validate: [isEmail, "Please provide a valid  email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: 6,
    },
    confirmPassword: {
        type: String,
        required: [true, "Confirm your password"],
        minlength: 6,
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user", "manager"],
        message: `Please identify your role as provided: admin, user, manager`,
        default: "user"
    }
    // cart: [
    //     {
    //         items: {
    //             products: Schema.Types.ObjectId,
    //             ref: "Products Collection"
    //         }
    //     }
    // ]
},
{
    versionKey: false,
    timestamps: true
}
);

const userModel = model<Users>("Users Collection", userSchema);

export default userModel
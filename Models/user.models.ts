import { model, Schema } from "mongoose";
import isEmail from "validator/lib/isEmail";

import { UserData } from "./AllInterfaces";

interface Users extends Document, UserData{};

const userSchema: Schema<Users> = new Schema({
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
    cart: [
        {
            items: {
                products: Schema.Types.ObjectId,
                ref: "Products Collection"
            }
        }
    ]
},
{
    versionKey: false,
    timestamps: true
}
);

const userModel = model<Users>("Users Collection", userSchema);

export default userModel
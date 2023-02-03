import jwt, { JwtPayload, Secret } from "jsonwebtoken";

interface Payload extends JwtPayload {
    _id: string,
    email: string
};

const secret = "suuvicodoiejeifivodufv"

export const GenerateToken = (user: Payload) =>{
    return jwt.sign(user, secret as Secret, {expiresIn : "1h"})
}
import Joi from "joi";

// VALIDATION SCHEMA OBJECT

export const ProductSchemaValidation = ({
    AdminLogin: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required().alphanum(),
        confirmPassword: Joi.string().required().valid(Joi.ref("password"))
    }),
    Products: Joi.object({
        name: Joi.string().required(),
        productImage: Joi.string().required(),
        price: Joi.string().required(),
        category: Joi.string().required()
    }),
})
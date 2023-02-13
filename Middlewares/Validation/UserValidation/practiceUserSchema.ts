import Joi from "joi"

export const UserSchemaValidation = ({
  register : Joi.object({
    name : Joi.string().required(),
    email :Joi.string().email().trim().lowercase().required(),
    password : Joi.string().min(6).required(),
    confirm : Joi.string().min(6).valid(Joi.ref("password")).required()
  }),
  login : Joi.object({
    email : Joi.string().email().trim().lowercase().required(),
    password : Joi.string().min(6).required()
  })
})
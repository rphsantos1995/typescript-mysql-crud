import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

const validateLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object({
    username: Joi.string().required().messages({
      'any.required': 'Username is required',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Password is required',
    }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

export default validateLogin;
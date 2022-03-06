import Joi from "joi";
import { NextFunction, Request, Response } from "express";

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    username: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json(error);
  }

  next();
};
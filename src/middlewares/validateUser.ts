import Joi from "joi";
import { NextFunction, Request, Response } from "express";

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    username: Joi.string().required().min(2),
    password: Joi.string().required().min(7),
    classe: Joi.string().required().min(2),
    level: Joi.number().required().min(1),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  next();
};
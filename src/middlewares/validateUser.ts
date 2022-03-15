import { NextFunction, Request, Response } from 'express';
import userSchema from './userSchema';

const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = userSchema.validate(req.body);
  
  if (error) {
    const statusCode = error.details[0].message.includes('required') ? 400 : 422;
    return res.status(statusCode).json({ error: error.details[0].message });
  }

  next();
};

export default validateUser;
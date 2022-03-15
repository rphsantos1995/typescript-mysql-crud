import { Router, Request, Response, NextFunction } from 'express'; 
import jwt from 'jsonwebtoken';
import { IUser } from '../models/interfaceUser';
import usersService from '../services/userService';
import validateUser from '../middlewares/validateUser';

const userRouter = Router();

// In this env cenario, its necessary to explicit the key for test aprove
const JWT_SECRET = 'mysecretkey';

const createUser = async (req: Request, res: Response, _next: NextFunction) => {
  const newUser: IUser = req.body;
  const newUserCreated = await usersService.create(newUser);

  const token = jwt.sign({ data: newUserCreated }, JWT_SECRET as string, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });
  return res.status(201).json({ token });
};

userRouter.use('/users', validateUser, createUser);

export default userRouter;
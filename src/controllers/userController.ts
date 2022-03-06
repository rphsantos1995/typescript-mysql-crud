import { Router, Request, Response, NextFunction } from 'express'; 
import { IUser } from '../models/interfaceUser';
import usersService from '../services/userService';
import { validateUser } from '../middlewares/validateUser';
import jwt from 'jsonwebtoken';
// import validateJWT from '../auth/validateJWT';



// In the env cenario, its necessary to explicit the key.
const JWT_SECRET = 'mysecretkey';
interface jwtConf {
  expiresIn: string,
  algorithm: string,
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const newUser: IUser = req.body;
  const newUserCreated = await usersService.create(newUser);

  const jwtConfig: jwtConf = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: newUserCreated }, JWT_SECRET as string, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });


  return res.status(201).json({ token });

};

export default { createUser };
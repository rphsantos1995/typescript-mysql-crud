import { Router, Request, Response, NextFunction } from 'express'; 
import jwt from 'jsonwebtoken';
import { InputUserLogin } from '../interfaces/interfaceUser';
import usersService from '../services/userService';
import validateLogin from '../middlewares/validateLogin';

const loginRouter = Router();

// In this env cenario, its necessary to explicit the key for test aprove
const JWT_SECRET = 'mysecretkey';

const login = async (req: Request, res: Response, _next: NextFunction) => {
  const user: InputUserLogin = req.body;
  const userLogin = await usersService.login(user);

  if (!userLogin.some((item) => !item.length)) {
    return res.status(401).json({ error: 'Username or password invalid' });
  }

  const token = jwt.sign({ data: userLogin }, JWT_SECRET as string, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });

  return res.status(200).json({ token });
};

loginRouter.post('/', validateLogin, login);

export default loginRouter;
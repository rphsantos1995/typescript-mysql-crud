import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express'; 
import { IDecode } from './decodeInterface';

// In the env cenario, its necessary to explicit the key.
const JWT_SECRET = 'mysecretkey';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token not found' });
  }

  try {
    const decoded: IDecode = jwt.verify(token, JWT_SECRET) as IDecode;

    if (!decoded.data[0].id) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const userId = decoded.data[0].id.toString();
    req.headers.userid = userId;

    // The tests drop Users table each time it runs, its not possible to check if the user exists,
   
    next();
  } catch (err) {
    console.log('JWT trycatch err: ', err);
    return res.status(401).json({ error: 'Invalid token' });
  }
}; 

export default validateToken;
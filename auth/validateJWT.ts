import jwt from 'jsonwebtoken';
import { Router, Request, Response, NextFunction } from 'express'; 
import  User from '../src/models/userModel';


// In the env cenario, its necessary to explicit the key.
const JWT_SECRET = 'mysecretkey';

// module.exports = async (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: 'Token not found' });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);

//     const user = await User.findOne({ where: { email: decoded.data.email } });

//     if (!user) {
//       return res.status(401).json({ message: 'Token user not found' });
//     }

//     req.user = user;

//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Expired or invalid token' });
//   }
// }; 
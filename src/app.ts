import express, { Router, Request, Response, NextFunction } from 'express';
 
import usersService from './services/userService';
import { IUser } from './models/interfaceUser';
import userController from './controllers/userController';
import { validateUser } from './middlewares/validateUser';

const app = express();

app.use(express.json());

app.post('/user', validateUser, userController.createUser);


export default app;

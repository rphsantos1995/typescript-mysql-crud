import express from 'express';
 
import userRouter from './controllers/userController';
import loginRouter from './controllers/loginController';
import productRouter from './controllers/productController';

const app = express();

app.use(express.json());

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/products', productRouter);

export default app;

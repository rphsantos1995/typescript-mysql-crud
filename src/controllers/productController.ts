import { Router, Request, Response, NextFunction } from 'express'; 
import { IProduct } from '../models/interfaceProduct';
import productService from '../services/productService';
import validateJWT from '../auth/validateJWT';
import validateProduct from '../middlewares/validateProduct';

const productRouter = Router();

const createProduct = async (req: Request, res: Response, _next: NextFunction) => {
  const newProduct: IProduct = req.body;
  const newUserCreated = await productService.createProduct(newProduct);
  return res.status(201).json({ item: { ...newUserCreated } });
};

productRouter.post('/', validateJWT, validateProduct, createProduct);

export default productRouter;

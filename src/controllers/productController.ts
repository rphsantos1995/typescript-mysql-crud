import { Router, Request, Response, NextFunction } from 'express'; 
import { IProduct } from '../interfaces/interfaceProduct';
import productService from '../services/productService';
import validateJWT from '../auth/validateJWT';
import validateProduct from '../middlewares/validateProduct';

const productRouter = Router();

const createProduct = async (req: Request, res: Response, _next: NextFunction) => {
  const newProduct: IProduct = req.body;
  const userId = Number(req.headers.userid);
  console.log('userid formato number --->', userId);
  
  const newUserCreated = await productService.createProduct(newProduct);
  return res.status(201).json({ item: { ...newUserCreated } });
};

const getAllProducts = async (req: Request, res: Response, _next: NextFunction) => {
  const allProducts = await productService.getAllProducts();
  return res.status(200).json(allProducts);
};

productRouter.post('/', validateJWT, validateProduct, createProduct);
productRouter.get('/', validateJWT, getAllProducts);

export default productRouter;
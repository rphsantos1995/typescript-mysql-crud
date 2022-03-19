import { Router, Request, Response, NextFunction } from 'express'; 
import { IOrder } from '../interfaces/interfaceOrder';
import orderService from '../services/orderService';
import validateJWT from '../auth/validateJWT';
import validateOrder from '../middlewares/validateOrder';

const orderRouter = Router();

const createOrder = async (req: Request, res: Response, _next: NextFunction) => {
  const orderInfo: IOrder = req.body;
  const userId = Number(req.headers.userid);
  
  const newOrderCreated = await orderService.createOrder(orderInfo, userId);
  return res.status(201).json({ order: newOrderCreated });
};

const getOrderById = async (req: Request, res: Response, _next: NextFunction) => {
  const orderId = Number(req.params.id);

  const orderById = await orderService.getOrderById(orderId);

  if (!orderById) return res.status(404).json({ error: 'Order not found' });

  return res.status(200).json(orderById);
};

orderRouter.post('/', validateJWT, validateOrder, createOrder);
orderRouter.get('/:id', validateJWT, getOrderById);

export default orderRouter;
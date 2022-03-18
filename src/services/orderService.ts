import { IOrder } from '../interfaces/interfaceOrder';
import orderModel from '../models/orderModel';

const createOrder = async (orderInfo: IOrder, userId: number) => {
  const newOrder = await orderModel.createOrder(orderInfo, userId);
  return newOrder;
};

export default { createOrder };
import { IOrder } from '../interfaces/interfaceOrder';
import orderModel from '../models/orderModel';

const createOrder = async (orderInfo: IOrder, userId: number) => {
  const newOrder = await orderModel.createOrder(orderInfo, userId);
  return newOrder;
};

const getOrderById = async (orderId: number) => {
  const orderById = await orderModel.getOrderById(orderId);
  if (!orderById.length) return undefined;

  const products = orderById.map((item) => item.products);
  const userInfo = orderById[0].userId;

  const productsInfo = { id: orderId, userId: userInfo, products };
  return productsInfo;
};

export default { createOrder, getOrderById };
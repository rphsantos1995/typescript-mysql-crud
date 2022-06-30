import { IOrder, AOrder } from '../interfaces/interfaceOrder';
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

const getAllOrders = async () => {
  const allOrders = await orderModel.getAllOrders();
  
  const getStructureOfAllOrders = () => allOrders.reduce((acc, { id, userId }) => {
    const isRepeated = acc.some((item) => item.id === id);

    if (!isRepeated) {
      const allProducts = allOrders.filter((i) => i.id === id)
        .map((item) => item.products);
  
      acc.push({
        id, userId, products: allProducts,
      });
    }

    return acc;
  }, [] as AOrder[]);

  const result = getStructureOfAllOrders();

  return result;
};

export default { createOrder, getOrderById, getAllOrders };
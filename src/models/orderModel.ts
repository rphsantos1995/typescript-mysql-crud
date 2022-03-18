import { OkPacket } from 'mysql2';
import { IOrder } from '../interfaces/interfaceOrder';
import connection from './connection';

const createOrder = async (orderInfo: IOrder, userId: number) => {
  const [resultOrder] = await connection.execute<OkPacket>(`INSERT INTO 
  Trybesmith.Orders (userId) VALUES (?)`, [userId]);

  const orderId = resultOrder.insertId;
  const updateOrderQuery = `UPDATE Trybesmith.Products 
    SET orderId = ?
    WHERE id = ?`;

  await Promise.all(orderInfo.products.map(async (productId: number) => {
    await connection.execute<OkPacket>(updateOrderQuery, [orderId, productId]);
  }));

  const { products } = orderInfo;
  return { userId, products };
};

export default { createOrder };
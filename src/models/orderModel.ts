import { OkPacket, RowDataPacket } from 'mysql2';
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

const getOrderById = async (orderId: number) => {
  const orderByIdQuery = `SELECT
    tro.id, tro.userId, trp.id as products
  FROM
    Trybesmith.Orders AS tro
  INNER JOIN
    Trybesmith.Products AS trp 
  ON 
    tro.id = trp.orderId
  AND
    tro.id = ?;`;
  // const productByIdQuery = `select * from Trybesmith.Products where orderId = ?;`;
  
  const [orderById] = await connection.execute<RowDataPacket[]>(orderByIdQuery, [orderId]);
  // const [productById] = await connection.execute<RowDataPacket[]>(productByIdQuery, [orderId]);

  console.log('resultado do orderByid na Model: ', orderById);

  return orderById;
};

const getAllOrders = async () => {
  const allOrdersQuery = `SELECT
    tro.id, tro.userId, trp.id as products
  FROM
    Trybesmith.Orders AS tro
  INNER JOIN
    Trybesmith.Products AS trp 
  ON 
  tro.id = trp.orderId`;

  const [allOrders] = await connection.execute<RowDataPacket[]>(allOrdersQuery);
  return allOrders;
}; 

export default { createOrder, getOrderById, getAllOrders };
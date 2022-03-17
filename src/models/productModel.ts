import { OkPacket } from 'mysql2';
import { IProduct, Product } from './interfaceProduct';
import connection from './connection';

const createProduct = async (product: IProduct): Promise<IProduct> => {
  const { name, amount } = product;

  const [result] = await connection.execute<OkPacket>(
    'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)', 
    [name, amount],
  );

  const { insertId: id } = result;

  const createdProduct: Product = { id, name, amount };

  return createdProduct;
};

export default { createProduct };

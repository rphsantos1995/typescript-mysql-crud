import { IProduct } from '../models/interfaceProduct';
import productModel from '../models/productModel';

const createProduct = async (userInfo: IProduct) => {
  const newProduct = await productModel.createProduct(userInfo);
  return newProduct;
};

export default { createProduct };
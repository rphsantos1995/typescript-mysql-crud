import { IUser } from '../models/interfaceUser';
import UserModel from '../models/userModel';

const create = async (userInfo: IUser) => {
  const newUser = await UserModel.create(userInfo);
  return newUser;
};

export default { create };
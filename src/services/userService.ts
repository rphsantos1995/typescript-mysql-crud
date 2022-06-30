import { IUser, InputUserLogin } from '../interfaces/interfaceUser';
import UserModel from '../models/userModel';

const create = async (userInfo: IUser) => {
  const newUser = await UserModel.create(userInfo);
  return newUser;
};

const login = async (userInfo: InputUserLogin) => {
  const userLogin = await UserModel.login(userInfo);
  return userLogin;
};

export default { create, login };
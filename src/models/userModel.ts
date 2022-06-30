import { OkPacket, RowDataPacket } from 'mysql2';
import connection from './connection';
import { IUser, User, InputUserLogin } from '../interfaces/interfaceUser';

const create = async (user: IUser): Promise<IUser> => {
  const { username, classe, level, password } = user;
  const [result] = await connection.execute<OkPacket>(
    'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)', 
    [username, classe, level, password],
  );
  const { insertId: id } = result;

  const createdUser: User = { id, username, classe, level, password };

  return createdUser;
};

const login = async (user: InputUserLogin) => {
  const { username, password } = user;
  const query = `SELECT * from Trybesmith.Users WHERE username = ? AND
  password = ?`;
  const [result] = await connection.query<RowDataPacket[]>(query, [username, password]);
  return result;
};

export default {
  create,
  login,
};
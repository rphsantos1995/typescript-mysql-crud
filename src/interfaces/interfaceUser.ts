export interface IUser {
  username: string,
  classe: string,
  level: number,
  password: string,
}

export interface User extends IUser {
  id: number
}

export interface InputUserLogin {
  username: string,
  password: string,
}

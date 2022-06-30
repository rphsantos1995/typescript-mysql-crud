export interface IDecode {
  data: [{
    id: number,
    username: string,
    classe: string,
    level: number,
    password: string
  }],
  iat: number,
  exp: number
}
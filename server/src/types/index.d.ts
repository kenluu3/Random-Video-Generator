declare namespace Express {
  interface User {
    id: string,
    username: string,
    password: string,
    email: string,
    active: boolean,
    createDate: string,
  }
}
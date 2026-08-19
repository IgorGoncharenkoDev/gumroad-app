declare namespace Express {
  interface User {
    email: string
    id: string
    isCreator: boolean
    name: string
  }

  interface Request {
    user: User
  }
}

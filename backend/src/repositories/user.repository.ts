import type { RegisterUserRequestBodyDTO } from '@/api/schemas/auth/auth.schema'
import { User } from '@/db/models/user.model'

export async function findUserByEmail(email: string) {
  return User.findOne({ email })
}

export async function findUserById(userId: string) {
  return User.findById(userId)
}

type CreateUserParams = Omit<RegisterUserRequestBodyDTO, 'password'> & {
  passwordHash: string
}

export async function createUser({
  email,
  name,
  passwordHash,
}: CreateUserParams) {
  return User.create({
    email,
    name,
    passwordHash,
  })
}

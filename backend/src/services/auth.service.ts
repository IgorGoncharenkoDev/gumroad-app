import type {
  LoginUserRequestBodyDTO,
  RegisterUserRequestBodyDTO,
} from '@/api/schemas/auth/auth.schema'
import { ConflictError } from '@/errors/conflict.error'
import { UnauthorizedError } from '@/errors/unauthorized.error'
import { comparePasswords, createHashedPassword } from '@/lib/auth/hash'
import {
  createUser as createDbUser,
  findUserByEmail,
} from '@/repositories/user.repository'

type RegisterUserParams = RegisterUserRequestBodyDTO

export async function registerUser({
  email,
  name,
  password,
}: RegisterUserParams) {
  const dbUser = await findUserByEmail(email)

  if (dbUser) {
    throw new ConflictError('Email already exists')
  }

  return createDbUser({
    email,
    name,
    passwordHash: await createHashedPassword(password),
  })
}

type LoginUserParams = LoginUserRequestBodyDTO

export async function loginUser({ email, password }: LoginUserParams) {
  const dbUser = await findUserByEmail(email)

  if (!dbUser) {
    throw new UnauthorizedError('Incorrect email or password')
  }

  const passwordsMatch = await comparePasswords({
    hashedPassword: dbUser.passwordHash,
    rawPassword: password,
  })

  if (!passwordsMatch) {
    throw new UnauthorizedError('Incorrect email or password')
  }

  return dbUser
}

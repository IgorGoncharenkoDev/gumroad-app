import type { ClientSession } from 'mongoose'

import type { RegisterUserRequestBodyDTO } from '@/api/schemas/auth/auth.schema'
import type { DbUserDocument, UserSchemaType } from '@/db/mongodb/models/user.model'
import { UserModel } from '@/db/mongodb/models/user.model'

export function findUserByEmail(email: string) {
  return UserModel.findOne({ email })
}

export function findUserById(userId: string) {
  return UserModel.findById(userId)
}

type CreateUserParams = Omit<RegisterUserRequestBodyDTO, 'password'> & {
  passwordHash: string
}

export function createUser({ email, name, passwordHash }: CreateUserParams) {
  return UserModel.create({
    email,
    name,
    passwordHash,
  })
}

type UpdateUserFilter = Partial<UserSchemaType> & {
  _id?: DbUserDocument['_id']
}

type UpdateUserParams = {
  filter: UpdateUserFilter
  update: Partial<UserSchemaType>
  session: ClientSession
}

export function updateUser({ filter, update, session }: UpdateUserParams) {
  return UserModel.updateOne(filter, {
    $set: update,
  }, {
    session,
  })
}

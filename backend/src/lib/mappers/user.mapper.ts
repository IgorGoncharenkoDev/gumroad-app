import type { SafeUserDTO } from '@/api/types/dtos.types'
import type { DbUserDocument } from '@/db/models/user.model'

export function toSafeUserDTO(dbUser: DbUserDocument): SafeUserDTO {
  return {
    email: dbUser.email,
    id: dbUser._id.toString(),
    isCreator: dbUser.isCreator,
    name: dbUser.name,
  }
}
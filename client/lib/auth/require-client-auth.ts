import { apiServerClient } from '@/lib/api-client/api-server-client'
import { unwrapApiResultOrThrow } from '@/lib/api-client/helpers'
import { UserDTO } from '@/types/dtos.types'

type GetCurrentUserReturn = UserDTO

export async function requireClientAuth(): Promise<GetCurrentUserReturn> {
  return await unwrapApiResultOrThrow(apiServerClient.user.currentUser.get())
}
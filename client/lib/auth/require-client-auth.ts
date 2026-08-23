import { apiServerClient } from '@/lib/api-client/api-server-client'
import { unwrapApiResultOrThrow } from '@/lib/api-client/helpers'
import { SafeUserDTO } from '@/types/dtos.types'

type GetCurrentUserReturn = SafeUserDTO

export async function requireClientAuth(): Promise<GetCurrentUserReturn> {
  return await unwrapApiResultOrThrow(apiServerClient.user.currentUser.get())
}
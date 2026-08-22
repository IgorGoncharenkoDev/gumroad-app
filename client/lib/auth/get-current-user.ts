import { apiServerClient } from '@/lib/api-client/api-server-client'
import { unwrapApiResultOrThrow } from '@/lib/api-client/helpers'

export function getCurrentUser () {
  return unwrapApiResultOrThrow(apiServerClient.user.currentUser.get())
}
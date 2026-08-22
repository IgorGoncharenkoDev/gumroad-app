import { cookies } from 'next/headers'

import { apiRequest } from '@/lib/api-client/api-request'
import { ClientResult } from '@/types/api.types';

export async function apiServerRequest<TResponse>(
  path: string,
  options: RequestInit = {},
): Promise<ClientResult<TResponse>> {
  const cookieStore = await cookies()

  return apiRequest<TResponse>(path, {
    ...options,
    headers: {
      ...options.headers,
      Cookie: cookieStore.toString(),
    },
  })
}
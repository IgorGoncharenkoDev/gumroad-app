import { redirect } from 'next/navigation'

import { requireClientAuth } from '@/lib/auth/require-client-auth'
import { ApiError } from '@/lib/errors/ApiError'
import { UserDTO } from '@/types/dtos.types'

export async function getAuthenticatedUser(): Promise<UserDTO> {
  try {
    return await requireClientAuth()
  } catch (error) {
    if (error instanceof ApiError && error.type === 'unauthorized') {
      redirect('/sign-in')
    }

    throw error
  }
}
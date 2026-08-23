import { redirect } from 'next/navigation'

import { requireClientAuth } from '@/lib/auth/require-client-auth'
import { AppError } from '@/lib/errors/AppError'
import { SafeUserDTO } from '@/types/dtos.types'

export async function getAuthenticatedUser (): Promise<SafeUserDTO> {
  try {
    return await requireClientAuth()
  } catch (error) {
    if (error instanceof AppError && error.type === 'unauthorized') {
      redirect('/sign-in')
    }

    throw error
  }
}
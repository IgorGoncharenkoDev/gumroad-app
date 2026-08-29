import { redirect } from 'next/navigation'

import { requireClientAuth } from '@/lib/auth/require-client-auth'
import { ApiError } from '@/lib/errors/ApiError'
import { UserDTO } from '@/types/dtos.types'

export async function getVisitor(): Promise<UserDTO | undefined> {
  try {
    await requireClientAuth()

    redirect('/')
  } catch (error) {
    if (error instanceof ApiError && error.type === 'unauthorized') {
      return
    }

    throw error
  }
}
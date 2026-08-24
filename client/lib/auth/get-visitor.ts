import { redirect } from 'next/navigation'

import { requireClientAuth } from '@/lib/auth/require-client-auth'
import { AppError } from '@/lib/errors/AppError'
import { SafeUserDTO } from '@/types/dtos.types'

export async function getVisitor (): Promise<SafeUserDTO | undefined> {
  try {
    await requireClientAuth()

    redirect('/')
  } catch (error) {
    if (error instanceof AppError && error.type === 'unauthorized') {
      return
    }

    throw error
  }
}
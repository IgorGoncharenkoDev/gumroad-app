import type { NextFunction, Request, Response } from 'express'

import { env } from '@/config/env'
import { UnauthorizedError } from '@/errors/unauthorized.error'
import { verifyAccessToken } from '@/lib/auth/token'
import { toSafeUserDTO } from '@/lib/mappers/user.mapper'
import { findUserById } from '@/repositories/user.repository'

export async function requireAuth(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const token = req.cookies[env.COOKIE_NAME]

  if (!token) {
    throw new UnauthorizedError()
  }

  const { userId } = verifyAccessToken(token)

  const dbUser = await findUserById(userId)

  if (!dbUser) {
    throw new UnauthorizedError()
  }

  req.user = toSafeUserDTO(dbUser)

  next()
}

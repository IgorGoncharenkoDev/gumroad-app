import type { Response } from 'express'

import { setAuthCookie } from './cookies'
import { createAccessToken } from './token'

type CreateAuthSessionParams = {
  res: Response
  userId: string
}

export function createAuthSession({
  res,
  userId,
}: CreateAuthSessionParams) {
  const token = createAccessToken({ userId })

  setAuthCookie({
    res,
    token,
  })
}

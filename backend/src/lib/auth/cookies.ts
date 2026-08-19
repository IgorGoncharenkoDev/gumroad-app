import type { Response } from 'express'

import { env } from '@/config/env'

type SetAuthCookieParams = {
  res: Response
  token: string
}

export function setAuthCookie ({
  res,
  token,
}: SetAuthCookieParams) {
  res.cookie(env.COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
}

export function clearAuthCookie (res: Response) {
  res.clearCookie(env.COOKIE_NAME, {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.NODE_ENV === 'production',
    path: '/',
  })
}
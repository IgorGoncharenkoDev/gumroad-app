import jwt from 'jsonwebtoken'

import { env } from '@/config/env'

type AccessTokenPayload = {
  userId: string
}

type CreateAccessTokenParams = {
  userId: string
}

export function createAccessToken({ userId }: CreateAccessTokenParams) {
  const payload: AccessTokenPayload = { userId }

  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  })
}

export function verifyAccessToken(
  token: string,
): AccessTokenPayload & jwt.JwtPayload {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload &
    jwt.JwtPayload
}

export function createRefreshToken(userId: string) {
  const payload = { userId }

  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  })
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET)
}

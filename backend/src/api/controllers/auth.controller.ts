import type { Request, Response } from 'express'

import type {
  LoginUserRequestBodyDTO,
  RegisterUserRequestBodyDTO,
} from '@/api/schemas/auth/auth.schema'
import type { ApiResponse, RequestWithBody } from '@/api/types/api.types'
import type { SafeUserDTO } from '@/api/types/dtos.types'
import { createAuthSession } from '@/lib/auth/auth-session'
import { clearAuthCookie } from '@/lib/auth/cookies'
import { toSafeUserDTO } from '@/lib/mappers/user.mapper'
import { loginUser, registerUser } from '@/services/auth.service'

type RegisterUserResponse = ApiResponse<SafeUserDTO>

export async function httpPostAuthRegisterUser(
  req: RequestWithBody<RegisterUserRequestBodyDTO>,
  res: Response<RegisterUserResponse>,
): Promise<Response<RegisterUserResponse>> {
  const dbUser = await registerUser(req.body)

  createAuthSession({
    res,
    userId: dbUser._id.toString(),
  })

  return res.json({
    status: 'success',
    data: toSafeUserDTO(dbUser),
  })
}

type LoginUserResponse = ApiResponse<SafeUserDTO>

export async function httpPostAuthLoginUser(
  req: RequestWithBody<LoginUserRequestBodyDTO>,
  res: Response<LoginUserResponse>,
): Promise<Response<LoginUserResponse>> {
  const dbUser = await loginUser(req.body)

  createAuthSession({
    res,
    userId: dbUser._id.toString(),
  })

  return res.json({
    status: 'success',
    data: toSafeUserDTO(dbUser),
  })
}

type LogoutUserResponse = ApiResponse<null>

export function httpPostAuthLogoutUser(
  req: Request,
  res: Response<LogoutUserResponse>,
): Response<LogoutUserResponse> {
  clearAuthCookie(res)
  return res.json({
    data: null,
    message: 'Logged out successfully',
    status: 'success',
  })
}

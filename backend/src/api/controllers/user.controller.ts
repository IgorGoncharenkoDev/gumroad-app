import type { Request, Response } from 'express'

import type { ApiResponse } from '@/api/types/api.types'
import type { SafeUserDTO } from '@/api/types/dtos.types'

type UserMeResponse = ApiResponse<SafeUserDTO>

export function httpGetUserMe(
  req: Request,
  res: Response<UserMeResponse>,
): Response<UserMeResponse> {
  return res.json({
    status: 'success',
    data: req.user
  })
}
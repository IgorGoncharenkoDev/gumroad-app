import { Router } from 'express'

import {
  httpPostAuthLoginUser,
  httpPostAuthLogoutUser,
  httpPostAuthRegisterUser,
} from '@/api/controllers/auth.controller'
import {
  loginUserSchema,
  registerUserSchema,
} from '@/api/schemas/auth/auth.schema'
import { validate } from '@/middlewares/validate.middleware'

export const authRouter = Router()

authRouter.post(
  '/register',
  validate({
    body: registerUserSchema,
  }),
  httpPostAuthRegisterUser,
)

authRouter.post(
  '/login',
  validate({
    body: loginUserSchema,
  }),
  httpPostAuthLoginUser,
)

authRouter.post('/logout', httpPostAuthLogoutUser)

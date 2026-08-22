import { Router } from 'express'

import { httpGetUserMe } from '@/api/controllers/user.controller'
import { requireAuth } from '@/middlewares/require-auth.middleware'

export const userRouter = Router()

userRouter.get('/me', requireAuth, httpGetUserMe)

import { Router } from 'express'

import { requireAuth } from '@/middlewares/require-auth.middleware'

export const userRouter = Router()

userRouter.get('/me', requireAuth, async (req, res) => {
  res.json({
    message: 'me user route',
  })
})
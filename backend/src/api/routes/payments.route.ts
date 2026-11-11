import { Router } from 'express'

import { httpPostCheckout } from '@/api/controllers/payments.controller'
import { createCheckoutSchema } from '@/api/schemas/payments/payments.schema'
import { requireAuth } from '@/middlewares/require-auth.middleware'
import { validate } from '@/middlewares/validate.middleware'

export const paymentsRouter = Router()

paymentsRouter.use(requireAuth)

paymentsRouter.post(
  '/checkout',
  validate({ body: createCheckoutSchema }),
  httpPostCheckout,
)
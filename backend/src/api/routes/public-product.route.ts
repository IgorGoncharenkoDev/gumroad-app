import { Router } from 'express'

import {
  httpGetProduct,
  httpGetProducts,
} from '@/api/controllers/public-product.controller'
import { requireAuth } from '@/middlewares/require-auth.middleware'

export const publicProductRouter = Router()

publicProductRouter.use(requireAuth)

publicProductRouter.get('/', httpGetProducts)

publicProductRouter.get('/:productId', httpGetProduct)
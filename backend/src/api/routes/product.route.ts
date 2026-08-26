import { Router } from 'express'

import {
  httpGetProduct,
  httpGetProducts,
  httpPostProduct,
} from '@/api/controllers/product.controller'
import { createProductSchema } from '@/api/schemas/product/product.schema'
import { requireAuth } from '@/middlewares/require-auth.middleware'
import { validate } from '@/middlewares/validate.middleware'

export const productRouter = Router()

productRouter.use(requireAuth)

productRouter.get('/', httpGetProducts)
productRouter.get('/:id', httpGetProduct)
productRouter.post(
  '/',
  validate({ body: createProductSchema }),
  httpPostProduct,
)

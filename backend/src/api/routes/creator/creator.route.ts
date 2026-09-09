import { Router } from 'express'

import { productRouter } from '@/api/routes/creator/product.route'
import { requireAuth } from '@/middlewares/require-auth.middleware'

export const creatorRouter = Router()

creatorRouter.use(requireAuth)

creatorRouter.use('/products', productRouter)

// TODO i |> '/sales'
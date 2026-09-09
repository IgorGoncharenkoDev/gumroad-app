import { type Request, type Response, Router } from 'express'

import {
  httpGetProduct, httpGetProductAssets,
  httpGetProducts,
  httpPatchProduct,
  httpPatchProductCover,
  httpPatchProductVisibility,
  httpPostCreatorProductSearch,
  httpPostProduct,
} from '@/api/controllers/creator/product.controller'
import {
  createProductSchema,
  creatorProductSearchSchema, updateProductCoverSchema,
  updateProductSchema,
} from '@/api/schemas/creator/product.schema'
import { requireAuth } from '@/middlewares/require-auth.middleware'
import { validate } from '@/middlewares/validate.middleware'

export const productRouter = Router()

productRouter.use(requireAuth)

/* IMPORT ROUTES */

productRouter.post(
  '/:productId/firecrawl/search',
  validate({ body: creatorProductSearchSchema }),
  httpPostCreatorProductSearch,
)

productRouter.post(
  '/:productId/firecrawl/scrape',
  async (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: '"/:productId/firecrawl/scrape" is healthy',
    })
  },
)

productRouter.post(
  '/:productId/assets/ingest',
  async (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: '"/:productId/assets/ingest" is healthy',
    })
  },
)

/* PRODUCT ROUTES */

productRouter.get('/:productId/assets', httpGetProductAssets)

productRouter.post(
  '/',
  validate({ body: createProductSchema }),
  httpPostProduct,
)
productRouter.get('/', httpGetProducts)
productRouter.get('/:productId', httpGetProduct)
productRouter.patch(
  '/:productId',
  validate({ body: updateProductSchema }),
  httpPatchProduct,
)

productRouter.patch(
  '/:productId/cover',
  validate({ body: updateProductCoverSchema }),
  httpPatchProductCover,
)

productRouter.patch('/:productId/publish', httpPatchProductVisibility)

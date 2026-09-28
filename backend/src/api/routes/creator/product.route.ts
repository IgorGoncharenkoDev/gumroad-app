import { Router } from 'express'

import {
  httpGetProduct,
  httpGetProductAssets,
  httpGetProducts,
  httpPatchProduct,
  httpPatchProductCover,
  httpPatchProductVisibility,
  httpPostCreatorProductScrape,
  httpPostCreatorProductSearch,
  httpPostProduct,
  httpPostProductIngestAssets,
} from '@/api/controllers/creator/product.controller'
import {
  createProductSchema,
  creatorProductSearchSchema,
  ingestAssetsSchema,
  scrapeProductSchema,
  updateProductCoverSchema,
  updateProductSchema,
} from '@/api/schemas/creator/product.schema'
import { validate } from '@/middlewares/validate.middleware'

export const productRouter = Router()

/* IMPORT ROUTES */

productRouter.post(
  '/:productId/firecrawl/search',
  validate({ body: creatorProductSearchSchema }),
  httpPostCreatorProductSearch,
)

productRouter.post(
  '/:productId/firecrawl/scrape',
  validate({ body: scrapeProductSchema }),
  httpPostCreatorProductScrape,
)

productRouter.post(
  '/:productId/assets/ingest',
  validate({ body: ingestAssetsSchema }),
  httpPostProductIngestAssets,
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

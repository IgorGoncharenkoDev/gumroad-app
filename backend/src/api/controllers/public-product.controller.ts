import type { Request, Response } from 'express'

import type { ApiResponse, RequestWithParams } from '@/api/types/api.types'
import type  { PublicProductListRecordDTO, PublicProductRecordDTO } from '@/api/types/dtos.types'
import { NotFoundError } from '@/errors/not-found.error'
import { toPublicProductListRecordDTO, toPublicProductRecordDTO } from '@/lib/mappers/product.mapper'
import {
  getPublicProduct,
  getPublicProducts,
} from '@/repositories/public-product.repository'

type GetProductsResponse = ApiResponse<PublicProductListRecordDTO[]>

export async function httpGetProducts(
  _req: Request,
  res: Response<GetProductsResponse>,
) {
  const publicProducts = await getPublicProducts()
  const publicProductListRecords = publicProducts.map((p) => toPublicProductListRecordDTO(p))

  return res.json({
    status: 'success',
    data: publicProductListRecords,
  })
}

type GetProductResponse = ApiResponse<PublicProductRecordDTO>

export async function httpGetProduct(
  req: RequestWithParams<{ productId: string }>,
  res: Response<GetProductResponse>,
) {
  const publicProduct = await getPublicProduct(req.params.productId)

  if (!publicProduct) {
    throw new NotFoundError('Product with the provided id was not found')
  }

  const publicProductRecord = toPublicProductRecordDTO(publicProduct)
  
  return res.json({
    status: 'success',
    data: publicProductRecord,
  })
}

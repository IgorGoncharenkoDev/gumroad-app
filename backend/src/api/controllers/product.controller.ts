import type { Request, Response } from 'express'

import type { CreateProductRequestBodyDTO } from '@/api/schemas/product/product.schema'
import type { ApiResponse, RequestWithBody } from '@/api/types/api.types'
import type { ProductDTO } from '@/api/types/dtos.types'
import { ProductModel } from '@/db/models/product.model'
import { createProduct } from '@/services/product.service'

type CreateProductResponse = ApiResponse<ProductDTO>

export async function httpPostProduct(
  req: RequestWithBody<CreateProductRequestBodyDTO>,
  res: Response<CreateProductResponse>,
): Promise<Response<CreateProductResponse>> {
  const product = await createProduct({
    productData: req.body,
    user: req.user,
  })

  return res.json({
    status: 'success',
    data: product,
  })
}

export async function httpGetProducts(req: Request, res: Response) {
  const products =
    await ProductModel
      .find({ creatorId: req.user.id })
      .sort({ createdAt: -1 })
      .lean()

  return res.json({
    status: 'success',
    data: products,
  })
}

// TODO i |> to be developed
export async function httpGetProduct(req: Request, res: Response) {}
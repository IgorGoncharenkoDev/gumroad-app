import type { ClientSession } from 'mongoose'

import type { ProductDTO } from '@/api/types/dtos.types'
import { ProductModel } from '@/db/models/product.model'

// defining the contract explicitly to avoid using Partial<ProductDTO>
type CreateProductParams = {
  creatorId: ProductDTO['creatorId']
  title: ProductDTO['title']
  description: ProductDTO['description']
  price: ProductDTO['price']
  slug: ProductDTO['slug']
}

export async function createProduct(
  product: CreateProductParams,
  session: ClientSession,
) {
  const [createdProduct] = await ProductModel.create([product], { session })
  return createdProduct
}
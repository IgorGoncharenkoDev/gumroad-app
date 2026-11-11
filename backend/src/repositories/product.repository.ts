import type { ClientSession } from 'mongoose'

import { ProductModel, type ProductSchemaType } from '@/db/mongodb/models/product.model'

// defining the contract explicitly to avoid using Partial<ProductSchemaType>
type CreateProductParams = {
  creatorId: ProductSchemaType['creatorId']
  title: ProductSchemaType['title']
  description: ProductSchemaType['description']
  price: ProductSchemaType['price']
  slug: ProductSchemaType['slug']
}

export async function createProduct(
  product: CreateProductParams,
  session: ClientSession,
) {
  const [createdProduct] = await ProductModel.create([product], { session })
  return createdProduct
}

export function findProductById (productId: string) {
  return ProductModel.findById(productId)
}
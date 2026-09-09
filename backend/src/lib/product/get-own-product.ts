import mongoose from 'mongoose'

import { ForbiddenError } from '@/errors/forbidden.error'
import { NotFoundError } from '@/errors/not-found.error'
import { ValidationError } from '@/errors/validation.error'
import { findProductById } from '@/repositories/product.repository'

type GetOwnProductParams = {
  productId: string
  userId: string
}

export async function getOwnProduct({ productId, userId }: GetOwnProductParams) {
  if (!mongoose.isValidObjectId(productId)) {
    throw new ValidationError('Invalid product id')
  }

  const dbProduct = await findProductById(productId)

  if (!dbProduct) {
    throw new NotFoundError('Product with the provided id does not exist')
  }

  const creatorId = dbProduct.creatorId.toString()

  // checking if the product is created by current user
  if (creatorId !== userId) {
    throw new ForbiddenError('Forbidden. You are not owner of this product')
  }
  
  return dbProduct
}
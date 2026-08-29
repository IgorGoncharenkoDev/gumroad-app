import mongoose, { Types } from 'mongoose'
import slugify from 'slugify'

import type { CreateProductRequestBodyDTO } from '@/api/schemas/product/product.schema'
import type { SafeUserDTO } from '@/api/types/dtos.types'
import { ProductModel } from '@/db/models/product.model'
import { toSafeProductDTO } from '@/lib/mappers/product.mapper'
import {
  createUniqueSlug,
} from '@/lib/product/find-unique-slug'
import { createProduct as createProductRepository } from '@/repositories/product.repository'
import { updateUser } from '@/repositories/user.repository'

type CreateProductParams = {
  productData: CreateProductRequestBodyDTO
  user: SafeUserDTO
}

export async function createProduct({ productData, user }: CreateProductParams) {
  const { description, price, title } = productData
  const { id: userId } = user

  const priceInCents = Math.round(price * 100)

  const baseSlug = slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  })

  const uniqueSlug = await createUniqueSlug(
    // starting/candidate value
    baseSlug,
    // the callback checks slug availability without knowing anything about db and models
    // (the algorithm is reusable, the database lookup is injected according to local needs)
    async (slug) => {
      const count = await ProductModel.countDocuments({ slug })
      return count > 0
    },
  )

  const creatorId = new Types.ObjectId(userId) // creating mongoose ObjectId instance using the userId string

  const productToCreate = {
    creatorId,
    title,
    description,
    price: priceInCents,
    slug: uniqueSlug,
  }

  const session = await mongoose.startSession()

  try {
    return await session.withTransaction(async () => {
      const product = await createProductRepository(productToCreate, session)

      await updateUser({
        filter: {
          _id: creatorId,
          isCreator: false,
        },
        update: {
          isCreator: true,
        },
        session,
      })

      return toSafeProductDTO(product)
    })
  } finally {
    await session.endSession()
  }
}
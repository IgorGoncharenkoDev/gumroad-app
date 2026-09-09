import mongoose, { Types } from 'mongoose'
import slugify from 'slugify'

import type {
  CreateProductRequestBodyDTO,
  UpdateProductCoverRequestBodyDTO,
  UpdateProductRequestBodyDTO,
} from '@/api/schemas/creator/product.schema'
import type { SafeUserDTO } from '@/api/types/dtos.types'
import { ProductModel } from '@/db/models/product.model'
import { ForbiddenError } from '@/errors/forbidden.error'
import { NotFoundError } from '@/errors/not-found.error'
import { ValidationError } from '@/errors/validation.error'
import { firecrawlSearch } from '@/lib/firecrawl/firecrawl'
import { toSafeImageAssetDTO } from '@/lib/mappers/asset.mapper'
import { toSafeProductDTO } from '@/lib/mappers/product.mapper'
import { createUniqueSlug } from '@/lib/product/find-unique-slug'
import { getOwnProduct } from '@/lib/product/get-own-product'
import {
  findImageAssetById,
  findProductAssets,
  getImageAssetDocumentsCount,
} from '@/repositories/image-asset.repository'
import { createProduct as createProductRepository , findProductById } from '@/repositories/product.repository'
import { updateUser } from '@/repositories/user.repository'

type SearchCreatorProductParams = {
  productId: string
  searchData: {
    limit: number
    query: string
  }
  userId: string
}

export default async function searchCreatorProduct({
  productId,
  searchData,
  userId,
}: SearchCreatorProductParams) {
  const { limit, query } = searchData

  const dbProduct = await findProductById(productId)

  if (!dbProduct) {
    throw new NotFoundError('Invalid product id')
  }

  const creatorId = dbProduct.creatorId.toString()

  // checking if the product is created by current user
  if (creatorId !== userId) {
    throw new ForbiddenError('Forbidden. You are not owner of this product')
  }

  return await firecrawlSearch({
    limit,
    query,
  })
}

type CreateProductParams = {
  productData: CreateProductRequestBodyDTO
  user: SafeUserDTO
}

export async function createProduct({
  productData,
  user,
}: CreateProductParams) {
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

type GetProductDetailsParams = {
  productId: string
  userId: string
}

export async function getProductDetails({ productId, userId }: GetProductDetailsParams) {
  const product = await getOwnProduct({ productId, userId })
  return toSafeProductDTO(product)
}

type UpdateProductParams = {
  data: UpdateProductRequestBodyDTO
  productId: string
  userId: string
}

export async function updateProduct({
  data,
  productId,
  userId,
}: UpdateProductParams) {
  const dbProduct = await getOwnProduct({ productId, userId })

  const { description, price, title } = data

  if (description !== undefined) {
    dbProduct.description = description
  }

  if (price !== undefined) {
    const priceInCents = Math.round(price * 100)
    dbProduct.price = priceInCents
  }

  if (title !== undefined) {
    const baseSlug = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    })

    const uniqueSlug = await createUniqueSlug(
      baseSlug,
      async (slug) => {
        const count = await ProductModel.countDocuments({ slug })
        return count > 0
      },
    )

    dbProduct.slug = uniqueSlug
    dbProduct.title = title
  }

  await dbProduct.save()

  return toSafeProductDTO(dbProduct)
}

type UpdateProductCoverParams = {
  data: UpdateProductCoverRequestBodyDTO
  productId: string
  userId: string
}

export async function updateProductCover({
  data,
  productId,
  userId,
}: UpdateProductCoverParams) {
  const dbProduct = await getOwnProduct({ productId, userId })

  const { imageAssetId } = data

  const dbAsset = await findImageAssetById(imageAssetId)

  if (!dbAsset) {
    throw new NotFoundError('Asset with the provided id does not exist')
  }

  // checking if the product is eligible for an update
  if (
    dbAsset.productId.toString() !== productId ||
    dbAsset.creatorId.toString() !== userId
  ) {
    throw new ForbiddenError('Forbidden')
  }

  dbProduct.coverImageAssetId = new Types.ObjectId(imageAssetId)
  await dbProduct.save()

  return toSafeProductDTO(dbProduct)
}

type UpdateProductVisibilityParams = {
  productId: string
  userId: string
}

export async function updateProductVisibility({
  productId,
  userId,
}: UpdateProductVisibilityParams) {
  const dbProduct = await getOwnProduct({ productId, userId })

  const imageAssetDocumentsCount = await getImageAssetDocumentsCount(dbProduct._id)

  if (!imageAssetDocumentsCount) {
    throw new ValidationError('A product must have at least one image to be published')
  }

  dbProduct.visibility = 'published'
  dbProduct.stats.assetCount = imageAssetDocumentsCount

  await dbProduct.save()

  return toSafeProductDTO(dbProduct)
}

type GetProductAssetsParams = {
  productId: string
  userId: string
}

export async function getProductAssets({
  productId,
  userId,
}: GetProductAssetsParams) {
  const dbProduct = await getOwnProduct({ productId, userId })
  const dbAssets = await findProductAssets(dbProduct._id)

  return dbAssets.map(
    (asset) => toSafeImageAssetDTO(asset),
  )
}
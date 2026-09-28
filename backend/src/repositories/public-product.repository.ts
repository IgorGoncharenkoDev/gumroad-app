import { Types } from 'mongoose'

import { ImageAssetModel } from '@/db/models/image-asset.model'
import { ProductModel } from '@/db/models/product.model'

export type PublicProductListRecord = {
  _id: Types.ObjectId
  title: string
  price: number
  slug: string
  creatorId: Types.ObjectId
  coverUrl: string | null
}

export async function getPublicProducts(): Promise<PublicProductListRecord[]> {
  return ProductModel.aggregate<PublicProductListRecord>([
    {
      $match: { visibility: 'published' },
    },
    {
      $lookup: {
        from: ImageAssetModel.collection.name,
        localField: 'coverImageAssetId',
        foreignField: '_id',
        as: 'cover',
      },
    },
    {
      $addFields: {
        coverUrl: {
          $ifNull: [{ $first: '$cover.cloudinary.secureUrl' }, null],
        },
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        price: 1,
        slug: 1,
        creatorId: 1,
        coverUrl: 1,
      },
    },
  ])
}

export type PublicProductRecord = {
  _id: Types.ObjectId
  title: string
  description: string
  price: number
  currency: 'EUR'
  slug: string
  visibility: 'published'
  stats: {
    assetCount: number
    soldCount: number
  }
  coverImageAssetId: Types.ObjectId | null
  creatorId: Types.ObjectId
  coverUrl: string | null
}

export async function getPublicProduct(id: string): Promise<PublicProductRecord | null> {
  const [product] = await ProductModel.aggregate<PublicProductRecord>([
    {
      $match: {
        _id: new Types.ObjectId(id),
        visibility: 'published',
      },
    },
    {
      $lookup: {
        from: ImageAssetModel.collection.name,
        localField: 'coverImageAssetId',
        foreignField: '_id',
        as: 'cover',
      },
    },
    {
      $addFields: {
        coverUrl: {
          $ifNull: [{ $first: '$cover.cloudinary.secureUrl' }, null],
        },
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        price: 1,
        currency: 1,
        slug: 1,
        visibility: 1,
        stats: 1,
        coverImageAssetId: 1,
        creatorId: 1,
        coverUrl: 1,
      },
    },
  ])

  return product ?? null
}
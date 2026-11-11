import type { HydratedDocument, InferSchemaType, Types } from 'mongoose'
import { model, Schema } from 'mongoose'

export type ProductVisibility = 'draft' | 'published'

type BaseProductDocument = {
  creatorId: Types.ObjectId

  title: string
  description: string
  price: number
  currency: 'EUR'

  slug: string
  visibility: ProductVisibility

  coverImageAssetId: Types.ObjectId | null

  stats: {
    assetCount: number
    soldCount: number
  }

  createdAt: Date
  updatedAt: Date
}

const productSchema = new Schema<BaseProductDocument>(
  {
    creatorId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ['EUR'],
      default: 'EUR',
    },
    visibility: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    coverImageAssetId: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    stats: {
      assetCount: { type: Number, default: 0 },
      soldCount: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  },
)

export const ProductModel = model<BaseProductDocument>('Product', productSchema)

export type ProductSchemaType = InferSchemaType<typeof productSchema>
export type DbProductDocument = HydratedDocument<ProductSchemaType>

import type { HydratedDocument, InferSchemaType, Types } from 'mongoose'
import { model, Schema } from 'mongoose'

export type BaseImageAssetDocument = {
  productId: Types.ObjectId
  creatorId: Types.ObjectId

  source: {
    sourceUrl: string
    sourcePageUrl?: string
  }

  cloudinary: {
    publicId: string
    secureUrl: string
    folder: string
  }

  meta: {
    filename: string
    contentType: string
    sizeBytes: number
    width: number
    height: number
  }

  orderIndex: number

  createdAt: Date
  updatedAt: Date
}

const imageAssetSchema = new Schema<BaseImageAssetDocument>({
  productId: { type: Schema.Types.ObjectId, required: true, index: true },
  creatorId: { type: Schema.Types.ObjectId, required: true, index: true },

  source: {
    sourceUrl: { type: String, required: true },
    sourcePageUrl: { type: String },
  },

  cloudinary: {
    publicId: { type: String, required: true },
    secureUrl: { type: String, required: true },
    folder: { type: String, required: true },
  },

  meta: {
    filename: { type: String, required: true },
    contentType: { type: String, required: true },
    sizeBytes: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },

  orderIndex: { type: Number, required: true },
},
  { timestamps: true })

export const ImageAssetModel = model<BaseImageAssetDocument>('ImageAsset', imageAssetSchema)

export type ImageAssetType = InferSchemaType<typeof imageAssetSchema>
export type DbImageAssetDocument = HydratedDocument<ImageAssetType>
import { type Types } from 'mongoose'

import { ImageAssetModel } from '@/db/mongodb/models/image-asset.model'

export function findImageAssetById(imageAssetId: string) {
  return ImageAssetModel.findById(imageAssetId)
}

export function getImageAssetDocumentsCount(productId: Types.ObjectId) {
  return ImageAssetModel.countDocuments({
    productId,
  })
}

export function findProductAssets(productId: Types.ObjectId) {
  return ImageAssetModel.find({ productId }).sort({ orderIndex: 1 })
}

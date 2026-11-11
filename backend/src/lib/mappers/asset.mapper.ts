import type { SafeImageAssetDTO } from '@/api/types/dtos.types'
import type { DbImageAssetDocument } from '@/db/mongodb/models/image-asset.model'

export function toSafeImageAssetDTO(
  dbImageAsset: DbImageAssetDocument,
): SafeImageAssetDTO {
  return {
    id: dbImageAsset._id.toString(),
    creatorId: dbImageAsset.creatorId.toString(),
    cloudinary: {
      secureUrl: dbImageAsset.cloudinary.secureUrl,
    },
    productId: dbImageAsset.productId.toString(),
    meta: {
      contentType: dbImageAsset.meta.contentType,
      filename: dbImageAsset.meta.filename,
      sizeBytes: dbImageAsset.meta.sizeBytes,
      width: dbImageAsset.meta.width,
      height: dbImageAsset.meta.height,
    },
    source: {
      sourcePageUrl: dbImageAsset.source.sourcePageUrl,
      sourceUrl: dbImageAsset.source.sourceUrl,
    },
  }
}
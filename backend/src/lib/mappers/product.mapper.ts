import type { SafeProductDTO } from '@/api/types/dtos.types'
import type { DbProductDocument } from '@/db/models/product.model'

export function toSafeProductDTO(dbProduct: DbProductDocument): SafeProductDTO {
  return {
    id: dbProduct._id.toString(),
    creatorId: dbProduct.creatorId.toString(),
    title: dbProduct.title,
    description: dbProduct.description,
    price: dbProduct.price / 100,
    slug: dbProduct.slug,
    coverImageAssetId: dbProduct.coverImageAssetId?.toString() || null,
    stats: dbProduct.stats,
    visibility: dbProduct.visibility,
  }
}
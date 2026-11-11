import type {
  PublicProductListRecordDTO,
  PublicProductRecordDTO,
  SafeProductDTO,
} from '@/api/types/dtos.types'
import type { DbProductDocument } from '@/db/mongodb/models/product.model'
import type {
  PublicProductListRecord,
  PublicProductRecord,
} from '@/repositories/public-product.repository'

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

export function toPublicProductListRecordDTO(
  dbProduct: PublicProductListRecord,
): PublicProductListRecordDTO {
  return {
    coverUrl: dbProduct.coverUrl,
    creatorId: dbProduct.creatorId.toString(),
    id: dbProduct._id.toString(),
    price: dbProduct.price,
    slug: dbProduct.slug,
    title: dbProduct.title,
  }
}

export function toPublicProductRecordDTO(
  dbProduct: PublicProductRecord,
): PublicProductRecordDTO {
  return {
    coverImageAssetId: dbProduct.coverImageAssetId?.toString() ?? null,
    coverUrl: dbProduct.coverUrl,
    creatorId: dbProduct.creatorId.toString(),
    currency: dbProduct.currency,
    description: dbProduct.description,
    id: dbProduct._id.toString(),
    price: dbProduct.price,
    slug: dbProduct.slug,
    stats: { ...dbProduct.stats },
    title: dbProduct.title,
    visibility: dbProduct.visibility,
  }
}

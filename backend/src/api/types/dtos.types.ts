import type { ProductSchemaType } from '@/db/models/product.model'

export type SafeUserDTO = {
  email: string
  id: string
  isCreator: boolean
  name: string
}

export type SafeProductDTO = {
  id: string
  creatorId: string
  title: string
  description: string
  price: number
  slug: string
  coverImageAssetId: string | null
  stats: {
    assetCount: number
    soldCount: number
  }
}
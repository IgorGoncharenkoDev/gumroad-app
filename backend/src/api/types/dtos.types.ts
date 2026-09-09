export type SafeUserDTO = {
  email: string
  id: string
  isCreator: boolean
  name: string
}

export type SafeProductDTO = {
  description: string
  coverImageAssetId: string | null
  creatorId: string
  id: string
  price: number
  slug: string
  stats: {
    assetCount: number
    soldCount: number
  }
  title: string
  visibility: 'draft' | 'published'
}

export type SafeImageAssetDTO = {
  id: string
  creatorId: string
  productId: string
  meta: {
    filename: string
    contentType: string
    sizeBytes: number
    width: number
    height: number
  }
  source: {
    sourcePageUrl?: string
    sourceUrl: string
  }
}
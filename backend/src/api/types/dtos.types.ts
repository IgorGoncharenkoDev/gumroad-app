export type SafeUserDTO = {
  email: string
  id: string
  isCreator: boolean
  name: string
}

export type SafeProductDTO = {
  coverImageAssetId: string | null
  creatorId: string
  description: string
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
  cloudinary: {
    secureUrl: string
  }
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

export type SelectedAsset = {
  url: string
  sourcePageUrl: string
}

export type ProductScrapeDTO = {
  candidates: SelectedAsset[]
  description: string
}

export type ProductIngestAssetsDTO = {
  assetsIngested: SafeImageAssetDTO[]
  assetsFailedToIngest: (SelectedAsset & { message: string })[]
}